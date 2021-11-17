import React, { useState } from "react";
import './Head.css'
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AdminField from "../Main/AdminField";

function Head({ course }) {
  const [showSubject, setShowSubject] = useState(false);

  return (
    <div className="head">
      <div className="head_first" onClick={() => setShowSubject(!showSubject)}>
        {course.data.name}
        <ArrowDropDownRoundedIcon />
      </div>
      {showSubject && (
        <div className="head_second">
          {course.data.subjects.map((sub,Serial) => (
            <AdminField course={course} sub={sub} Serial={Serial}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Head;
