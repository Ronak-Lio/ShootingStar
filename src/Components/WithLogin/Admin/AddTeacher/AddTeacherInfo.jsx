import React, { useEffect, useState } from "react";
import "./AddTeacherInfo.css";
import { Button } from "@mui/material";
import ShowCourse from "./ShowCourse";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";
import Showcourse from "../Showcourse/Showcourse";

function AddTeacherInfo() {
  const [{ newteachercourse, newteachercoursesubject, user }] = useStateValue();
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseSubject, setCourseSubject] = useState([]);
  const [id, setId] = useState('');

  useEffect(() => {
    db.collection('CoursesName').onSnapshot((snapshot) => (
      setCourses(snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      })))
    ))
  }, [])

  // useEffect(()=>{ 
  //  db.collection('addByAdmin').where('email',"==",email).get()
  //   .then((querySnapshot)=>{
  //     querySnapshot.forEach((doc)=>{ 
  //       setId(doc.id);
  //     })
  //   })  
  // },[email])
  
  const searchUser = () => {
    if (email) {
      db.collection('addByAdmin').where('email', "==", email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setId(doc.id);
          })
        })
    }
  }

  return (
    <div className="addTeacher">
      <div className="addTeacherIn">
        <div className="addTeacher__logo">Add Course</div>
        <div className="addTeacherHeader">
          <input
            placeholder="Enter User Email "
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={searchUser}>Search</button>
          {id && <>
            <div className="showEmail">
              Email : {email}
            </div>
            <div className="addTeacherCourse">
              {courses.map((course) => (
                <Showcourse course={course} id={id} email={email} />
              ))}
            </div></>}
        </div>
      </div>
    </div>
  );
}

export default AddTeacherInfo;
