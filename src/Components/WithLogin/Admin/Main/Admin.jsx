import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';

function Admin() {
    const history=useHistory();
    return (
        <div className="admin">
            <div className="info">
                This page is for admin.If you are not admin please close this page.
            </div>
            <div className="signin">
                Welcome admin please login ka kast kare
            <Button variant="contained" onClick={()=>{
                history.push('/adminsign');
            }}>Sign In</Button>
            </div>
        </div>
    )
}

export default Admin
