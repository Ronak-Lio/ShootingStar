import React, { useEffect } from 'react';
import './UpdatePage.css'
import { useHistory } from 'react-router-dom';
import db, { auth } from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import HeaderMain from '../Header/HeaderMain';
import HeaderTeacher from '../Teacher/HeaderTeacher/HeaderTeacher';
import { useState } from 'react';
import { Button } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(60),
      height: theme.spacing(60),
    },
  }));

function UpdatePage() {
    
    const classes = useStyles()

    const history = useHistory();
    const [popUpShowSelectedDp,setPopUpShowSelectedDp]=useState(false);
    const [{ signInAs, user }] = useStateValue();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [loading,setLoading]= useState(false)

    const UpdateAccount = async (e) => {
        e.preventDefault();
        if (name && number) {
            db.collection('users').doc(user.uid).update({
                address: address,
                contact: number, 
            }).then(() => {
                db.collection(signInAs == 'teacher' ? 'teachers' : 'students').doc(user.uid).update({
                    address: address,
                    contact: number,
                })
            })
            setName('')
            setAddress('')
            setNumber('')
            history.push('/profile')
        } else {
            alert('Please, Fill the input !')
        }
    };
    const selectImage = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
        
    }
    useEffect(()=>{
        if(image){
            setPopUpShowSelectedDp(true)
        }
    },[image])
    const updateImage = async () => {
        if (image) {
            if (signInAs.imageURL === '') {
                setLoading(true)
                const ID = uuid();
                const ImageRef = firebase.storage().ref('profilePhotos').child(ID);
                await ImageRef.put(image);
                ImageRef.getDownloadURL().then((url) => {
                    db.collection('users').doc(user?.uid).update({
                        imageURL: url,
                        imageID: ID,
                    })
                    setPopUpShowSelectedDp(false);
                    setImage(null);
                    history.push('/profile');
                    setLoading(false)
                })
            } else {
                setLoading(true)
                const ImageRef = firebase.storage().ref('profilePhotos').child(signInAs?.imageID);
                await ImageRef.delete();
                await ImageRef.put(image);
                ImageRef.getDownloadURL().then((url) => {
                    db.collection('users').doc(user?.uid).update({
                        imageURL: url,
                    })
                    setPopUpShowSelectedDp(false);
                    setImage(null);
                     setLoading(false)
                    history.push('/profile');
                })
            }
        }
    }
    return (
        <>{
            popUpShowSelectedDp &&   (
               loading ? <><div className="popupChatTeacher">
               <div
                   className="popUpTOP"
               >
                   <div className="popUpTOP__first">
                       <h6>{image?.name && image?.name}</h6>
                   </div>
               </div>
               <div className="popupbodyImage_Img">
                Updating
               </div>
           </div></>: <div className="popupChatTeacher">
                    <div
                        className="popUpTOP"
                        onClick={() => setPopUpShowSelectedDp(!popUpShowSelectedDp)}
                    >
                        <div className="popUpTOP__first">
                            <h6>{image?.name && image?.name}</h6>
                        </div>
                        <ClearRoundedIcon className="backIconChat" />
                    </div>
                    <div className="popupbodyImage_Img">
                        <img src={URL.createObjectURL(image)} alt="" className="popupbody_Image_img" />
                    </div>
                    <div onClick={updateImage} className={'updateImageCSS'}>
                        
                    <SendIcon fontSize="large" className="SendIcon"/>
                    </div>
                    
                </div>
            )}
            <div className="updatePageUpdate">
                <div className="profileUpdate">
                    {!signInAs?.value === "teacher" ? <HeaderMain /> : <HeaderTeacher />}
                    <div className="profile__bodyUpdate">
                        <div className="profile__bodyInUpdate">
                            <div className="profile__FotuUpdate">
                                <div className="profile__Fotu_1Update"> 
                                          {signInAs?.imageURL ? 
                                        <img src={signInAs?.imageURL} className="profile__Photo" alt="image" />
                                        :
                                        <AccountCircleRoundedIcon style={{ fontSize:100,color:"lightgray"}}/>
                                    }
                                        <div>
                                            <label htmlFor="doc">
                                                <AddAPhotoIcon className="profile_Fotu_UpdateIcon"
                                                    style={{ fontSize: 30 }}
                                                />
                                            </label>
                                            <input type="file" id={'doc'} style={{ display: 'none' }} onChange={selectImage} />
                                            
                                            </div> 
                                    <div className="update__profile__NameUpdate">
                                        {/* <input placeholder={'Name'} type="text" value={name} onChange={e => setName(e.target.value)} /> */}
                                        {signInAs?.name}
                                    </div>
                                </div>

                            </div>
                            <div className="profile__NameUpdate">
                                <div className="profile__Name__InUpdate">
                                    <input placeholder={'Mobile'} type="number" value={number} onChange={e => setNumber(e.target.value)} />
                                    <input placeholder={'Address'} type="text" value={address} onChange={e => setAddress(e.target.value)} />
                                    <h5 className="Courses__divUpdate">
                                        <Button onClick={UpdateAccount} variant="contained">Update</Button>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePage
