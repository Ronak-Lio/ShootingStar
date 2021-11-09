import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useStateValue } from '../../../../StateProvider';
import AddStudentInfo from './AddStudentInfo';

function AddStudent() {
    const [{user}]=useStateValue();
    const [input,setInput]=useState('');
    const [password,setPassword]=useState('');

    const AddUser=(e)=>{
        e.preventDefault();
    }
    return (
       <>
       {!user?.email ? <div className="addTeacher">
           <div className="addTeacherIn">
               <div className="addTeacher__logo">
                   ADD STUDENT
               </div>
        <div className="addTeacherHeader">
         <input placeholder="Email " value={input} type="text" onChange={e=>setInput(e.target.value)} />
        <input  placeholder="Password " type="text" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="addTeacherBody">
        <Button variant="contained" onClick={AddUser}>NEXT</Button>
        </div>
        </div>
        </div>:
        <AddStudentInfo/>
        }
       </>
    )
}

export default AddStudent
