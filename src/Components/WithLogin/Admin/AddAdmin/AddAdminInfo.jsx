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

  useEffect(() => {
    db.collection("CoursesName").onSnapshot((snapshot) =>
      setCourses(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      )
    );
  }, []);

  const AddAdminInfo = (e) => {
    e.preventDefault();
    db.collection("users").add({
      name: name,
      value: "teacher",
      courseName: newteachercourse,
      courseSubject: newteachercoursesubject,
      email: user.email,
    });
  };

  return (
    <div className="addTeacher">
      <div className="addTeacherIn">
        <div className="addTeacher__logo">ADD ADMIN INFO</div>
        <div className="addTeacherHeader">
          <input
            placeholder="Name "
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email "
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password "
            value={password}
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="addTeacherCourse">
            Select Course
            {courses.map((course) => (
              <ShowCourse course={course} />
            ))}
          </div>
          <div className="addTeacherSubject"></div>
        </div>
        <div className="showCourseSubject">
          Selected Course : {newteachercoursesubject}
        </div>
        <div className="addTeacherBody">
          <Button variant="contained" onClick={AddAdminInfo}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddAdminInfo;
