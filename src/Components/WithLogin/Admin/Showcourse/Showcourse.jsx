import React, { useEffect, useState } from "react";
import './Show.css'
import Showsubject from "./Showsubject";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useStateValue } from "../../../../StateProvider";
import db from "../../../../firebase";

function Showcourse({ course, id,email }) {
  const [{ newteachercourse, user }, dispatch] = useStateValue();
  const [showSubject, setShowSubject] = useState(false);
  const [showCourseSubject, setShowCourseSubject] = useState("");

  const [alreadyadd, setAlreadyadd] = useState('');
  const [alreadyaddSub, setAlreadyaddSub] = useState([]);

  useEffect(() => { 
    if (course && id) {
      db.collection('addByAdmin').doc(id).collection('courses').where('name', '==', course?.data?.name).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setAlreadyadd(doc.id); 
            setAlreadyaddSub(doc.data()); 
          }) 
        })
    }
  }, []);

  return (
    <>
      <div
        className="addTeacherCourse_Show"
        onClick={() => setShowCourseSubject(!showCourseSubject)}
      >
        <div className="head">
          <div
            className="head_first"
            onClick={() => setShowSubject(!showSubject)}
          >
            {course.data.name}
            <ArrowDropDownRoundedIcon />
          </div>
          {showSubject && (
            <div className="head_second">
              {course.data.subjects.map((sub) => (
                <Showsubject course={course} sub={sub} id={id} />
              ))} 
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Showcourse;
