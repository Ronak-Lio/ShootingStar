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

function UpdatePage() {
    const history = useHistory();
    const [popUpShowSelectedDp,setPopUpShowSelectedDp]=useState(false);
    const [{ signInAs, user }] = useStateValue();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const UpdateAccount = async (e) => {
        e.preventDefault();
        if (name && number) {
            db.collection('users').doc(user.uid).update({
                name: name,
                address: address,
                contact: number,
                imageURL: '',
                imageID: ''
            }).then(() => {
                db.collection(signInAs == 'teacher' ? 'teachers' : 'students').doc(user.uid).update({
                    name: name,
                    address: address,
                    contact: number,
                })
            })
            setName('')
            setAddress('')
            setNumber('')
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
                const ID = uuid();
                const ImageRef = firebase.storage().ref('profilePhotos').child(ID);
                await ImageRef.put(Image);
                ImageRef.getDownloadURL().then((url) => {
                    db.collection('users').doc(user?.uid).update({
                        imageURL: url,
                        imageID: ID,
                    })
                })
            } else {
                const ImageRef = firebase.storage().ref('profilePhotos').child(signInAs?.imageID);
                await ImageRef.update(Image);
                ImageRef.getDownloadURL().then((url) => {
                    db.collection('users').doc(user?.uid).update({
                        imageURL: url,
                    })
                })
            }
        }
    }
    return (
        <>{
            popUpShowSelectedDp &&   (
                <div className="popupChatTeacher">
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
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div><AccountCircleRoundedIcon className="profile_Fotu_Update" style={{ fontSize: 110 }} />
                                            <label htmlFor="doc">
                                                <AddAPhotoIcon className="profile_Fotu_UpdateIcon"
                                                    style={{ fontSize: 30 }}
                                                />
                                            </label>
                                            <input type="file" id={'doc'} style={{ display: 'none' }} onChange={selectImage} /></div>
                                    </div>
                                    <div className="update__profile__NameUpdate">
                                        <input placeholder={'Name'} type="text" value={name} onChange={e => setName(e.target.value)} />
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
