import React, { useState } from 'react'
import { Button } from '@mui/material';
import AddAdminInfo from './AddAdminInfo';
import { useStateValue } from '../../../../StateProvider';

function AddAdmin() {
    const [{user}]=useStateValue();
    const [input,setInput]=useState('');
    const [password,setPassword]=useState('');

    const AddUser=(e)=>{
        e.preventDefault();
    }
    return (
        <>
         {
       <AddAdminInfo/>
       }    
        </>
    )
}

export default AddAdmin;
