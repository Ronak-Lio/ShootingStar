import React from "react";
import { useHistory } from "react-router";
import './HeaderAdmin.css'

function HeaderAdmin() {
  const history=useHistory();
  return (
    <div className="HeaderAdmin">
      <div className="HeaderAdminFirst" onClick={()=>{
        history.push('/addstudent')
      }}>
          Add Student
          {window.location.pathname==="/addstudent" && <div className="add_teacher"></div>
          }
      </div>
      <div className="HeaderAdminFirst" onClick={()=>{
        history.push('/addteacher')
      }}>
          Add Teacher
          {window.location.pathname==="/addteacher" && <div className="add_teacher"></div>
          }
      </div>
      <div className="HeaderAdminFirst" onClick={()=>{
        history.push('/addadmin')
      }}>
          Add Admin
          {window.location.pathname==="/addadmin" && <div className="add_teacher"></div>
          }
      </div>
    </div>
  );
}

export default HeaderAdmin;
