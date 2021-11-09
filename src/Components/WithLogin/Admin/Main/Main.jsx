import React from 'react';
import './Main.css';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import AddStudent from '../AddStudent/AddStudent';
import AddAdmin from '../AddAdmin/AddAdmin';
import AddTeacher from '../AddTeacher/AddTeacher';
import Admin from './Admin';
import AdminSign from './AdminSign';

function Main() {
    return (
        <div className="mainAdmin">
            <HeaderAdmin/>
           <div className="mainAdminBody">
           {window.location.pathname=='/addstudent' && <AddStudent/>}
            {window.location.pathname=='/addteacher' && <AddTeacher/>}
            {window.location.pathname=='/addadmin' && <AddAdmin/>}
            {window.location.pathname=='/admin' && <Admin/>}
            {/* {window.location.pathname=='/adminsign' && <AdminSign/>} */}
           </div>
        </div>
    )
}

export default Main;