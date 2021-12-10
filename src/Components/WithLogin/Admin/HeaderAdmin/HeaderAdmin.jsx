import React from "react";
import { useHistory } from "react-router";
import './HeaderAdmin.css'
import Button from '@mui/material/Button';
import { auth } from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";

function HeaderAdmin() {
  const history = useHistory();
  const [{ user }] = useStateValue();

  return (
    <div className="headerAdmin__out">
      <div className="Admin__home">
      <div
            className="Admin__Logo"
            onClick={() => history.push("/admin")}
          >
            <img src={"/img/lolo.svg"} alt="logo" className="logo" />
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
      <div className="HeaderAdminSecond" >
      <Button variant="outlined" onClick={()=>{
        if (user) {
          auth.signOut().then(()=>{
            window.location.reload()
          });
          history.push("/")
        }
      }}>Logout</Button>
      </div>
    </div>
  );
}

export default HeaderAdmin;
