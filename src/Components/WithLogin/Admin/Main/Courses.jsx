import React, { useEffect, useState } from 'react';
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import db from '../../../../firebase';
import AdminField from './AdminField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ShowCourse from '../AddTeacher/ShowCourse';
import { useHistory } from 'react-router';

function Courses() {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        db.collection('CoursesName').onSnapshot((snapshot) => (
          setCourses(snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          })))
        ))
      }, [])
    return (
        <div className="TotalUsers">
          <div className="totalUser__Header">
            Total Student
          </div>
          <div className="totalUser__Body">
            {loading ? (<div className="totalUser__Loading">
              <div className="popupbodyImage_Loading">
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress style={{ fontSize: 110 }} />
                </Box>
              </div>
            </div>) : (
              courses.map((course) => (
                <ShowCourse course={course} />
              ))
            )}
          </div>
        </div>
    )
}

export default Courses
