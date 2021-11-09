import React, { useState } from "react";
import { useStateValue } from "../../../../StateProvider";   
import HeaderSubjectTeacher from "./HeaderSubjectTeacher";

function HeaderCourseTeacher({ course }) {
  const [{ signInAs, user, course_Subject }, dispatch] = useStateValue();
  const [showSub, setShowSub] = useState(false);

  return (
    <div className="headerCourse">
      <div
        className="HeaderMain__HiddenDiv__IN"
        onClick={() => setShowSub(!showSub)}
      >
        {course.data?.name}
      </div>
      <div className={showSub ? "Course__Subject" : "Course__Subject__Hide"}>
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
