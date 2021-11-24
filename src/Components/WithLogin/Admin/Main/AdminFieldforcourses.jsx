import React from 'react';
import Button from '@mui/material/Button';
import './AdminField.css';
import db from '../../../../firebase';

function AdminFieldforcourses({ totalUser, Serial, sub }) {
    
    const deleteUser=()=>{
        db.collection('addByAdmin').doc(totalUser?.id).delete().then(()=>{
            alert('User delete successfully');
        }).catch((error)=>{
            alert('Error : ',error.message)
        })
    }
    return (
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
                    <Button variant="contained" onClick={deleteUser}>Delete User</Button>
                }
            </div>
        </div>
    )
}

export default AdminFieldforcourses
