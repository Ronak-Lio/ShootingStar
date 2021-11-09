import React, { useEffect, useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";
import { actionTypes } from "../../../../reducer";

function ShowCourse({ course }) {
  const[{newteachercourse,user} , dispatch] = useStateValue();
  const [showSubject, setShowSubject] = useState(false);
  const [showCourseSubject, setShowCourseSubject] = useState("");
console.log(newteachercourse)
  useEffect(() => {
    // dispatch({
    //   type:actionTypes.SIGN_IN_AS,
    //   signInAs:snapshot.data(),
    //  })
  }, [user?.uid]);
  return (
    <div>
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
                <ul>
                  <li
                    onClick={() =>
                      {
                      dispatch({
                        type: actionTypes.SET_NEW_TEACHER_COURSE,
                        newteachercourse: course.data.name,
                      })
                      dispatch({
                        type: actionTypes.SET_NEW_TEACHER_COURSE_SUBJECT,
                        newteachercoursesubject: sub,
                      })
                    }
                    }
                  >
                    {sub}
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowCourse;
