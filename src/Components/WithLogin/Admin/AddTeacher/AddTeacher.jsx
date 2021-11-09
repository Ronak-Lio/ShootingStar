import { Button } from "@mui/material";
import React, { useState } from "react";
import db, { auth } from "../../../../firebase";
import { actionTypes } from "../../../../reducer";
import { useStateValue } from "../../../../StateProvider";
import "./AddTeacher.css";
import AddTeacherInfo from "./AddTeacherInfo";

function AddTeacher() {
    const[{signInAs, adduser} , dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");

  const AddUser = (e) => {
    e.preventDefault();
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(input, password)
      .then((auth) => {
        dispatch({
          type: actionTypes.SET_ADD_USER,
          adduser: auth.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      {!adduser?.email ?<>
        <div className="addTeacher">
          <div className="addTeacherIn">
            <div className="addTeacher__logo">LOGIN WITH TEACHER'S ACCOUNT</div>
            <div className="addTeacherHeader">
              <input
                placeholder="Email "
                value={input}
                type="text"
                onChange={(e) => setInput(e.target.value)}
              />
              <input
                placeholder="Password "
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="addTeacherBody">
              <Button variant="contained" onClick={AddUser}>
                NEXT
              </Button>
            </div>
          </div>
        </div>
        </>
        :
        <AddTeacherInfo/>
      }
    </>
  );
}

export default AddTeacher;
