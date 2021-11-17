import React from 'react';
import './Main.css';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import AddTeacher from '../AddTeacher/AddTeacher';
import Admin from './Admin';
import Courses from './Courses';
import User from './User'
import AddTeacherInfo from '../AddTeacher/AddTeacherInfo';
import AddStudent from '../AddTeacher/AddStudent';
import AddCourse from '../AddCourse/AddCourse';
import AddAdmin from '../AddAdmin/AddAdmin';

function Main() {
    return (
        <div className="mainAdmin">
            <HeaderAdmin />
            <div className="mainAdminBody">
                {window.location.pathname == '/addcourses' && <Courses />}
                {window.location.pathname == '/admin' && <User/>}
                {window.location.pathname == '/addteacher' && <AddTeacher/>}
                {window.location.pathname == '/addstudent' && <AddStudent/>}
                {window.location.pathname == '/addteacherinfo' && <AddTeacherInfo/>}
                {window.location.pathname == '/addcourse' && <AddCourse/>}
                {window.location.pathname == '/addadmin' && <AddAdmin
                />}
            </div>
        </div>
    )
}

export default Main;