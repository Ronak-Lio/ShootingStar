import React from "react";
import HeaderMain from "../Header/HeaderMain";
import "./Profile.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HeaderTeacher from "../Teacher/HeaderTeacher/HeaderTeacher";
import { useStateValue } from "../../../StateProvider";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import Head from "../Admin/AddCourse/Head";

function Profile() {
  const history = useHistory();
  const [{ signInAs, user, signInAsCourses }, dispatch] = useStateValue();
  const UpdateProfile = (e) => {
    e.preventDefault();
    history.push('/update');
  };
  const LogOut = (e) => {
    e.preventDefault();
    if (user) {
      auth.signOut();
      history.push("/signIn")
    }
  }

  return (
    <div className="profile">
      {signInAs?.value != "teacher" ? <HeaderMain /> : <HeaderTeacher />}
      <div className="profile__body">
        <div className="profile__bodyIn">
          <div className="profile__Fotu">
            <div className="profile__Fotu_1">
              {signInAs?.imageURL ?
                <img src={signInAs?.imageURL} className="profile__Photo" alt="image" />
                :
                <AccountCircleRoundedIcon style={{ fontSize: 100, color: "lightgray" }} />
              }
              <div className="update__profile__Name">
                <h6>{signInAs?.name}</h6>
                <h6>{user?.email}</h6>
              </div>
            </div>
            <div className="update__profile">
              <button onClick={UpdateProfile}>Update </button>
              <button onClick={LogOut}>LogOut</button>
            </div>
          </div>
          <div className="profile__Name">
            <div className="profile__Name__In">
              <h6>{signInAs?.contact}</h6>
              <h6>{signInAs?.address}</h6>
              <h5 className="Courses__div"> 
               {signInAsCourses && signInAsCourses.map((course,Serial)=>(
                <Head course={course}/>
               ))}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
