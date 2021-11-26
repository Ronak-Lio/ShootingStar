import React, { useState } from 'react';
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AdminField from '../Main/AdminField';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';

function Showcourseforadd({ course }) {
  const history = useHistory();
  const [showSubject, setShowSubject] = useState(false);

  return (
    <>
      <div
        className="addTeacherCourse_Show"
      >
        <div className="head">
          <div className="head_first">
            <div className="head_first__name">
            {course.data.name}
            </div>
            <div className="head__first__sec">
            <div className="head_button" onClick={() => {
              history.push('/editcourses')
            }}>
            {/* <Button variant="contained" color="success">
           Edit Course
          </Button> */}
            </div>
            <div className="head_dropDown" onClick={() => setShowSubject(!showSubject)}>
            <ArrowDropDownRoundedIcon />
            </div>
            </div>
          </div>
          {showSubject && (
            <div className="head_second">
              {course.data.subjects.map((sub, Serial) => (
                // <Showsubject course={course} sub={sub} id={id} />
                // <h6>{sub}</h6>
                <AdminField totalUser={sub} Serial={Serial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Showcourseforadd;
