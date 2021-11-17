import React, { useEffect, useState } from 'react';
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import db from '../../../../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import ShowCourse from '../AddTeacher/ShowCourse';
import AdminField from './AdminField';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Showcourse from '../Showcourse/Showcourse';
import Showsubjectforadd from '../Showcourse/Showcourseforadd';

function Courses() {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showShowCourses,setShowShowCourses]=useState(false)

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
        <div className="totalUser__Header__Head">
          Total Courses
        </div>
        <div className="totalUser__Header__SecHead">
          <div className="totalUser__Header__AddUser">
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={() => {
                history.push('/adduserinfo')
              }}>Add Course</Button>
            </Stack>
          </div>
          <div className="totalUser__Header__Cross" onClick={() => {
            setShowShowCourses(!showShowCourses);
          }}>
            <ArrowDropDownRoundedIcon />
          </div>
        </div>
      </div>
     {showShowCourses && <div className="totalUser__Body">
        {loading ? (<div className="totalUser__Loading">
          <div className="popupbodyImage_Loading">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress style={{ fontSize: 110 }} />
            </Box>
          </div>
        </div>) : (
          courses.map((course) => (
            <Showsubjectforadd course={course}/>
          ))
        )}
      </div>}
    </div>
  )
}

export default Courses
