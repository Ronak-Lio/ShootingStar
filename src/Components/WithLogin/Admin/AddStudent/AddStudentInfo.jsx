import React, { useEffect, useState } from "react";
import "./AddStudentInfo.css";
import { Button } from "@mui/material";
import ShowCourse from "./ShowCourse";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";

function AddStudentInfo() {
  const[{studentcourse,studentcoursesubject,user,adduser} , dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [courses,setCourses]=useState([]);

  useEffect(()=>{
    db.collection('CoursesName').onSnapshot((snapshot)=>(
      setCourses( snapshot.docs.map((doc) => ({ 
        data: doc.data(),
        id: doc.id,
      })))
    ))
  },[])

  const AddStudentInfo = (e) => {
    e.preventDefault();
    db.collection('users').doc(adduser.uid).set({
      name:name,
      value:'student', 
      email:adduser.email,
      address:address,
    }).then(()=>{
      db.collection('students').doc(adduser.uid).set({
        name:name,
        subjects:studentcoursesubject,
        email:adduser.email,
        address:address,
      })
    })
  };

  return (
    <div className="addTeacher">
      <div className="addTeacherIn">
        <div className="addTeacher__logo">ADD STUDENT INFO</div>
        <div className="addTeacherHeader">
          <input
            placeholder="Enter Student Name "
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Enter Student Address "
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="addTeacherCourse">
              <div className="Selectcourse">
              Select Course
              </div>
            {courses.map((course)=>(
            <ShowCourse course={course}/>
            ))}
          </div>
          {/* <div className="addTeacherSubject"></div> */}
        </div>
        <div className="showCourseSubject">
          <div>Selected Course : {studentcourse}</div>
          <div>
            {studentcoursesubject.map((sub)=>(
              <li>{sub}</li>
              ))}
              </div>
        </div>
        <div className="addTeacherBody">
          <Button variant="contained" onClick={AddStudentInfo}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default AddStudentInfo;
