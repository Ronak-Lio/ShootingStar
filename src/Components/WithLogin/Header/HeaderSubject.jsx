import React from "react";
import db from "../../../firebase";
import { actionTypes } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";

function HeaderSubject({ subject, course }) {
  const [{ showDiv, user, course_Subject, course_Main, course_SubjectID,course_MainID}, dispatch]=useStateValue();
  const selectSubject=()=> {
    dispatch({
      type: actionTypes.SET_COURSE,
      course_Subject: subject,
    });
    dispatch({
      type: actionTypes.SET_COURSE_MAIN,
      course_Main: course,
    });
    if(subject){
      console.log("objectobjectobject",course)
        db.collection("Courses")
        .where("name", "==",course)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log("doc?.id",doc?.id)
            dispatch({
              type:actionTypes.SET_COURSE_MAIN_ID,
              course_MainID:doc.id,
            })
            db.collection("Courses").doc(doc.id).collection('Subjects')
            .where("name", "==",subject)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc1) => {
                dispatch({
                    type:actionTypes.SET_COURSE_ID,
                    course_SubjectID:doc1.id,
                })
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


        db.collection("students").doc(user.uid).collection("courses")
        .where("name", "==",course)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log("doc?.id",doc?.id)
            dispatch({
              type:actionTypes.SET_USER_COURSEID,
              userCourseId:doc.id,
            })
            db.collection("students").doc(user.uid).collection("courses").doc(doc.id).collection("subjects")
            .where("name", "==",subject)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc1) => {
                dispatch({
                   type : actionTypes.SET_USER_SUBJECTID,
                   userSubjectId : doc1.id,
                })
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
      dispatch({
        type:actionTypes.SET_SHOW_DIV,
        showDiv:false,
      })
      }
  
  return (
    <div>
      <div onClick={selectSubject}>{subject}</div>
    </div>
  );
}

export default HeaderSubject;
