import React from 'react';
import Button from '@mui/material/Button';
import './AdminField.css';
import { useHistory } from 'react-router-dom';

function AdminField({ totalUser, Serial,sub }) {
    const history=useHistory();

    return (
        <>
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
                {totalUser?.data.value!='admin' &&  <div className="adminField__Sec">
               {totalUser?.data &&
               <Button variant="contained" color="success"
                 onClick={()=>{
                    history.push('/addteacherinfo')
                }}
                >
                    Add Courses
                </Button>}
                </div>}
        </div>
        </>
    )
}

export default AdminField
