import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import db from '../../../../firebase';
import AdminField from './AdminField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ShowCourse from '../AddTeacher/ShowCourse';
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

function Admin() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [totalUser, setTotalUser] = useState([]);
  const [totalTeacher, setTotalTeacher] = useState([]);
  const [totalStudent, setTotalStudent] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    db.collection('CoursesName').onSnapshot((snapshot) => (
      setCourses(snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      })))
    ))
  }, [])

  useEffect(() => {
    setLoading(true)
    db.collection("users")
      .onSnapshot((snapshot) => {
        setTotalUser(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setLoading(true);
    db.collection("students")
      .onSnapshot((snapshot) => {
        setTotalStudent(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
        setLoading(false)
      })
  }, [])


  useEffect(() => {
    setLoading(true)
    db.collection("teachers")
      .onSnapshot((snapshot) => {
        setTotalTeacher(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        )
        setLoading(false);
      })
  }, [])

  return (
    <div className="admin">
      <div className="adminHome__body">
        {/* for total course box */}
        <div className="TotalUsers">
          <div className="totalUser__Header">
            <div className="totalUser__Header__Head">
              Total Users
            </div>
            <div className="totalUser__Header__Cross" onClick={() => {
              setShowBox(!showBox)
            }}>
              <ArrowDropDownRoundedIcon />
            </div>
          </div>
          {showBox && <div className="totalUser__Body">
            {
              loading ? (<div className="totalUser__Loading">
                <div className="popupbodyImage_Loading">
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress style={{ fontSize: 110 }} />
                  </Box>
                </div>
              </div>) :
                (totalUser.map((totalUser, Serial) => (
                  <AdminField totalUser={totalUser} Serial={Serial} />
                )))
            }
          </div>}
        </div>

        {/* for total teacher */}
        <div className="TotalUsers">
          <div className="totalUser__Header">
            Total Teacher
          </div>
          <div className="totalUser__Body">
            {loading ? (<div className="totalUser__Loading">
              <div className="popupbodyImage_Loading">
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress style={{ fontSize: 110 }} />
                </Box>
              </div>
            </div>) : (totalTeacher.map((totalTeacher, Serial) => (
              <AdminField totalUser={totalTeacher} Serial={Serial} />
            )))}
          </div>
        </div>

        {/* for total user */}
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
            </div>) : (totalStudent.map((totalStudent, Serial) => (
              <AdminField totalUser={totalStudent} Serial={Serial} />
            )))}
          </div>
        </div>

        {/* for total course */}
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

      </div>
    </div>
  )
}

export default Admin;
