import React from 'react';
import Button from '@mui/material/Button';
import './AdminField.css';
import { useHistory } from 'react-router-dom';

function AdminField({ totalUser, Serial,sub }) {
    const history=useHistory();
  console.log(totalUser)
    return (
        <>
        <div className="adminField">
            <div className="adminField__First">
                <div className="adminField__serial">
                    {Serial + 1}.
                </div>
                <div className="adminField__Name">
                    {totalUser && totalUser?.data && totalUser?.data?.email}
                    {sub && sub}
                </div>
                </div>
                {totalUser && totalUser?.data && totalUser?.data?.value!='admin' &&  <div className="adminField__Sec">
               {totalUser && totalUser?.data &&
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
