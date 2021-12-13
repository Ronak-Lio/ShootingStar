import React, { useState } from "react";
import { actionTypes } from "../../../../reducer";
import { useStateValue } from "../../../../StateProvider";   
import HeaderSubjectTeacher from "./HeaderSubjectTeacher";

function HeaderCourseTeacher({ course }) {
  const [{showDiv }, dispatch] = useStateValue();

  const handleShowSubject=()=>{
      dispatch({
        type: actionTypes.SET_SHOW_DIV,
        showDiv: true,
      })
  }

  return (
    <div className="headerCourse">
      <div
        className="HeaderMain__HiddenDiv__IN"
        onClick={handleShowSubject}
      >
        {course.data?.name}
      </div>
      <div className={showDiv ? "Course__Subject" : "Course__Subject__Hide"}>
        {Array(course.data?.subjects.length)
          .fill()
          .map((_, i) => (
            // <button onClick={selectSubject(course.data?.subjects[i])}>
            <h6>
              <HeaderSubjectTeacher
                subject={course.data?.subjects[i]}
                course={course.data?.name}
              />
            </h6>
            // </button>
          ))}
      </div>
    </div>
  );
}

export default HeaderCourseTeacher;
