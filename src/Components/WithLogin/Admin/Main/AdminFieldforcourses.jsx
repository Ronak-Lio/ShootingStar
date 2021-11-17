import React from 'react';
import Button from '@mui/material/Button';
import './AdminField.css';
import { useHistory } from 'react-router-dom';

function AdminFieldforcourses({ totalUser, Serial, sub }) {
    const history = useHistory();

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
        </div>
    )
}

export default AdminFieldforcourses
