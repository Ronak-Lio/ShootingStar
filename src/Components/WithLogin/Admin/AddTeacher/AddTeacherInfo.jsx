import React, { useEffect, useState } from "react";
import "./AddTeacherInfo.css";
import { Button } from "@mui/material";
import ShowCourse from "./ShowCourse";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";

function AddTeacherInfo() {
  const[{newteachercourse,newteachercoursesubject,user} , dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [courses,setCourses]=useState([]);
  const [contact,setContact]=useState('');

  useEffect(()=>{ 
    db.collection('CoursesName').onSnapshot((snapshot)=>(
      setCourses( snapshot.docs.map((doc) => ({ 
        data: doc.data(),
        id: doc.id,
      })))
    ))
  },[])

  const AddTeacherInfo = (e) => {
    e.preventDefault();
    db.collection('users').doc(user?.uid).set({
      name:name,
      value:'teacher',
      // courseName:newteachercourse,
      // courseSubject:newteachercoursesubject,
      email:user.email,
      address:address,
      contact:contact,
    }).then(()=>{
      db.collection('teachers').doc(user.uid).set({
        name:name,
        // subjects:newteachercoursesubject,
        email:user.email,
        address:address,
        contact:contact,
      })
    })
  };

  return (
    <div className="addTeacher">
      <div className="addTeacherIn">
        <div className="addTeacher__logo">ADD TEACHER INFO</div>
        <div className="addTeacherHeader">
          <input
            placeholder="Name "
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Name "
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            placeholder="Name "
            value={contact}
            type="number"
            onChange={(e) => setContact(e.target.value)}
          />
          <div className="addTeacherCourse">
              Select Course
            {courses.map((course)=>(
            <ShowCourse course={course}/> 
            ))}
          </div>
          <div className="addTeacherSubject"></div>
        </div>
        <div className="showCourseSubject">
          Selected Course : {newteachercoursesubject}
        </div>
        <div className="addTeacherBody">
          <Button variant="contained" onClick={AddTeacherInfo}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherInfo;
