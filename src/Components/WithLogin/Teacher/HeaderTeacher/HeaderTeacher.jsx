import React, { useEffect, useState } from "react";
import "./HeaderTeacher.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatIcon from "@mui/icons-material/Chat";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";
import { actionTypes } from "../../../../reducer";
import HeaderCourse from "../../Header/HeaderCourse";
import HeaderCourseTeacher from "./HeaderCourseTeacher";

function HeaderTeacher() {
  const [{ user,signInAs, showDiv,teacherSubject,teacherCourse,coursesArray}, dispatch] = useStateValue();
  const history = useHistory();
  // const [coursesArray, setCoursesArray] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      db.collection("teachers")
        .doc(user?.uid)
        .collection("courses")
        .onSnapshot((snapshot) =>
          // setCoursesArray(
            // snapshot.docs.map((doc) => ({
            //   data: doc.data(),
            //   id: doc.id,
            // }))
          // )
         {
          dispatch({
            type: actionTypes.SET_COURSES_ARRAY,
            coursesArray:snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          })
         }
        );
    }
  }, [user]);
 
  useEffect(() => {
    if (!signInAs?.currentCourse) {
      if (coursesArray[0]?.data?.name) {
        db.collection("Courses")
          .where("name", "==", coursesArray[0]?.data?.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log("doc?.id", doc?.id);
              db.collection("Courses")
                .doc(doc.id)
                .collection("Subjects")
                .where("name", "==", coursesArray[0]?.data?.subjects[0])
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc1) => {
                    if (!signInAs?.currentCourse) {
                      db.collection('users').doc(user.uid).set({
                        currentCourse: coursesArray[0]?.data?.name,
                        currentSubject: coursesArray[0]?.data?.subjects[0],
                        currentCourseID: doc?.id,
                        currentSubjectID: doc1.id,
                        name: signInAs.name,
                        value: signInAs.value,
                      })
                    }
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

      }
    }
  }, [coursesArray]);
 
  return (
    <>
      <div className="headerMain">
        <div className="headerMain__Left">
          <div
            className="HeaderMain__Logo"
            onClick={() => history.push("/main")}
          >
            <img src={"/img/lolo.svg"} alt="logo" className="logo" />
            <img src="/img/Star_logo.png" alt="" className="logo_m" />
          </div>
        </div>
        <div className="headerMain__Middle">
          <div className="headerMain__Middle">
            <div
              className="headerMain__assignment"
              onClick={() => history.push("/AssignmentsPage")}
            >
              <IconButton>
                <AssignmentIcon />
              </IconButton>
              <div className="headerMain__chat__text">Assignment</div>
            </div>
            <div
              className="headerMain__assignment"
              onClick={() => history.push("/DoubtsPage")}
            >
              <IconButton>
                <QuestionAnswerIcon />
              </IconButton>
              <div className="headerMain__chat__text">Doubt</div>
            </div>
            <div
              className="headerMain__assignment"
              onClick={() => history.push("/leaderboard")}
            >
              <IconButton>
                <LeaderboardIcon />
              </IconButton>
              <div className="headerMain__chat__text">LeaderBoard</div>
            </div>
          </div>
        </div>
        <div className="HeaderMain__Right">
          <div className="HeaderMain__Right__Div"></div>
          <div
            className="HeaderMain__Profile"
            onClick={() => {
              history.push("/profile");
            }}
          >
           </div>
        </div>
        <div className="HeaderMain__Right">
          <div className="HeaderMain__Right__Div">
            <div className="HeaderMain__Selectcourse">
              <div className="HeaderMain__Selectcourse__Name">
                {signInAs?.currentSubject}
                {", "}
                {signInAs?.currentCourse}
              </div>
              <div
                className="HeaderMain__SelectCourse_icon"
                onClick={() => {
                  dispatch({
                    type: actionTypes.SET_SHOW_DIV,
                    showDiv: !showDiv,
                  });
                }}
              >
                <ArrowDropDownRoundedIcon />
              </div>
            </div>
            {/* for course select drop down */}
            <div
              className={
                showDiv ? "HeaderMain__HiddenDiv" : "HeaderMain__HiddenDiv_hide"
              }
            >
              {coursesArray.map((course) => (
                <HeaderCourseTeacher course={course} />
              ))}
            </div>
          </div>
          <div
            className="HeaderMain__Profile"
            onClick={() => {
              history.push("/profile");
            }}
          >
            <AccountCircleRoundedIcon />
          </div>
        </div>
      </div>

      {/* for mobile */}
      <div className="HeaderMain__For__Mobile">
        <div
          className="headerMain__chat"
          onClick={() => history.push("/chat")}
        >
          <IconButton>
            <ChatIcon />
          </IconButton>
        </div>
        <div className="headerMain__assignment">
          <IconButton>
            <AssignmentIcon />
          </IconButton>
        </div>
        <div className="headerMain__doubt">
          <IconButton>
            <QuestionAnswerIcon />
          </IconButton>
        </div>
        {/* acount symbol */}
        <div
          className="account__profile"
          onClick={() => history.push("/leaderboard")}
        >
          <IconButton>
            <LeaderboardIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default HeaderTeacher;
