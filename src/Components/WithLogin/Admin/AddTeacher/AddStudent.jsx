import React, { useEffect, useState } from "react";
import "./AddTeacherInfo.css";
import { Button } from "@mui/material";
import ShowCourse from "./ShowCourse";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";
import { useHistory } from "react-router-dom";

function AddStudent() {
  const history=useHistory();
  const[{newteachercourse,newteachercoursesubject,user}] = useStateValue();
  const [email, setEmail] = useState("");
  const [already,setAlready]=useState(false);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    setAlready(false)
    setLoading(true)
   db.collection('addByAdmin').where('email',"==",email).get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        setAlready(true)
      })
    }) 
    setLoading(false)
  },[email])

  const AddTeacher = (e) => {
    e.preventDefault();
    if(!already && !loading){
      db.collection('addByAdmin').add({
      value:'student',
      email:email,
    })
    history.push('/admin')
  }else{
      alert("This user is already exists or try again")
    }
  };

  return (
    <div className="addTeacher">
      <div className="addTeacherIn">
        <div className="addTeacher__logo">ADD TEACHER INFO</div>
        <div className="addTeacherHeader">
          <input
            placeholder="Email "
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="addTeacherBody">
          <Button variant="contained" onClick={AddTeacher}>Add</Button>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;

