import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react'
import db, { auth } from '../../../../firebase';
import { actionTypes } from '../../../../reducer';
import { useStateValue } from '../../../../StateProvider';

function AdminSign() {
    const[{signInAs,user} , dispatch] = useStateValue();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
     
    const signIn=()=>{
        auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {

    //     d                                                      
      setEmail('');
      setPassword('');
      })
      .catch((error) => alert(error.message));
      
    }

    return (
        <>
        <div className="addTeacher">
          <div className="addTeacherIn">
            <div className="addTeacher__logo">LOGIN ACCOUNT</div>
            <div className="addTeacherHeader">
              <input
                placeholder="Email "
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password "
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="addTeacherBody">
              <Button variant="contained" onClick={signIn}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
        </>
    )
}

export default AdminSign
