import React from "react";
import { useHistory } from "react-router";
import './HeaderAdmin.css'

function HeaderAdmin() {
  const history = useHistory();
  return (
    <div className="headerAdmin__out">
      <div className="Admin__home">
      <div
            className="Admin__Logo"
            onClick={() => history.push("/admin")}
          >
            <img src={"/img/lolo.svg"} alt="logo" className="logo" />
            <img src={"/img/Star_logo.png"} alt="logo" className="logo_m" />
          </div>
      </div>
      <div className="HeaderAdmin">
        <div className="HeaderAdminFirst" onClick={() => {
          history.push('/admin')
        }}>
          Users
          {window.location.pathname === "/admin" && <div className="add_teacher"></div>
          }
        </div>
        <div className="HeaderAdminFirst" onClick={() => {
          history.push('/addcourses')
        }}>
         Courses
          {window.location.pathname === "/addcourses" && <div className="add_teacher"></div>
          }
        </div>
        <div className="HeaderAdminFirst" onClick={() => {
          history.push('/addadmin')
        }}>
          Admin
          {window.location.pathname === "/addadmin" && <div className="add_teacher"></div>
          }
        </div> 
      </div>
    </div>
  );
}

export default HeaderAdmin;
