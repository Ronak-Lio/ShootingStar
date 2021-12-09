import React, { useEffect, useState } from "react";
import "./AddAdminInfo.css";
import { Button } from "@mui/material";
import ShowCourse from "./ShowCourse";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";

function AddAdminInfo() {
  const [{ newteachercourse, newteachercoursesubject, user }, dispatch] =
    useStateValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState([]);
  const [already, setAlready] = useState(false)

  const AddAdminInfo = (e) => {
    e.preventDefault();
    db.collection('addByAdmin').where("email", '==', email).get()
      .then((querySnapshot) => {
          if (querySnapshot.empty === true) {
            db.collection("addByAdmin").add({
              value: "admin",
              email: email,
            });
            setEmail('')
          }else{
            alert('This email address is already exist');
            setEmail('')
          }
      })
      .catch((error)=>{
        alert('Error',error?.message)
      })
  };

  return (
    <div className="addTeacher">
      <div className="addTeacherIn">
        <div className="addTeacher__logo">ADD ADMIN INFO</div>
        <div className="addTeacherHeader">
          <input
            placeholder="Email "
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="addTeacherBody">
          <Button variant="contained" onClick={AddAdminInfo}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddAdminInfo;
