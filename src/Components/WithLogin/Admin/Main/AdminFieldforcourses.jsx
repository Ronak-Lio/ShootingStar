import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './AdminField.css';
import db from '../../../../firebase';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

function AdminFieldforcourses({ totalUser, Serial, sub }) {
    const [popupshowImageFUll, setPopupshowImageFUll] = useState(false);

    const deleteUser = () => {
        db.collection('addByAdmin').doc(totalUser?.id).delete().then(() => {
            alert('User delete successfully');
        }).catch((error) => {
            alert('Error : ', error.message)
        })
    }

    return (
        <>
                {popupshowImageFUll ?
                <div className="adminField_For_Delete">
            <div className="admin__second">
                {totalUser?.data && totalUser?.data.email &&
                    <Button variant="contained" onClick={deleteUser}>CONFIRM</Button>
                }
            </div>
            <div className="admin__second">
                {totalUser?.data && totalUser?.data.email &&
                    <Button variant="contained" color="error" onClick={()=>{
                        setPopupshowImageFUll(false);
                    }}>CANCEL</Button>
                }
            </div>
            </div>
                :
                <div className="adminField">
            <div className="adminField__First">
                    <div className="adminField__serial">
                        {Serial + 1}.
                    </div>
                    <div className="adminField__Name">
                        {totalUser?.data && totalUser?.data.email}
                        {sub && sub}
                        {!totalUser?.data && totalUser}
                    </div>
                </div>
                <div className="admin__second">
                    {totalUser?.data && totalUser?.data.email &&
                        <Button variant="contained" onClick={()=>{
                            setPopupshowImageFUll(true);
                        }}>Delete User</Button>
                    }
                </div>
            </div>
                }
        </>
    )
}

export default AdminFieldforcourses;