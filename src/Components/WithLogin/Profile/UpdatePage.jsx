import React from 'react';
import './UpdatePage.css'
import { useHistory } from 'react-router-dom';
import db, { auth } from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HeaderMain from '../Header/HeaderMain';
import HeaderTeacher from '../Teacher/HeaderTeacher/HeaderTeacher';
import { useState } from 'react';
import { Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function UpdatePage() {
    const history = useHistory();
    const [{ signInAs, user, coursesArray }, dispatch] = useStateValue();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const UpdateAccount = (e) => {
        e.preventDefault();
        if (name && number) {
            db.collection('users').doc(user.uid).update({
                name: name,
                address: address,
                contact: number,
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
        }else{
            alert('Please, fill the input !')
        }
    };
    return (
        <>
            <div className="updatePageUpdate">
                <div className="profileUpdate">
                    {!signInAs?.value === "teacher" ? <HeaderMain /> : <HeaderTeacher />}
                    <div className="profile__bodyUpdate">
                        <div className="profile__bodyInUpdate">
                            <div className="profile__FotuUpdate">
                                <div className="profile__Fotu_1Update">
                                    {/* <label htmlFor="doc">
              <InsertDriveFileRoundedIcon/>
                </label>
                <input type="file" id={'doc'} style={{display:'none'}} value={doc} onChange={e=>{
                  setDoc(e.target.value)}} accept="image/pdf , image/html , image/js"/>
              </div> */}
                                    <label htmlFor="doc">
                                        <AddAPhotoIcon
                                            style={{ fontSize: 110, color: "grey" }}
                                        />
                                    </label>
                                    <input type="file" id={'doc'} style={{ display: 'none' }} onChange={e => {
                                        setImage(e.target.value)
                                    }} accept="image/pdf , image/html , image/js" />
                                    <div className="update__profile__NameUpdate">
                                        {/* <h6>{signInAs?.name}</h6> */}
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
