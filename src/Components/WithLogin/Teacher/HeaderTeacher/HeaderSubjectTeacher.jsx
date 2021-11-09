import React from "react";
import db from "../../../../firebase";
import { actionTypes } from "../../../../reducer";
import { useStateValue } from "../../../../StateProvider"; 

function HeaderSubjectTeacher({ subject, course }) {
  const [{ showDiv,teacherCourse, user}, dispatch]=useStateValue();
  const selectSubject=()=> {
    dispatch({
      type: actionTypes.SET_TEACHER_COURSE,
      teacherCourse: course,
    });
    dispatch({
      type: actionTypes.SET_TEACHER_SUBJECT,
      teacherSubject: subject,
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
              type:actionTypes.SET_TEACHER_COURSE_ID,
              teacherCourseId:doc.id,
            })
            db.collection("Courses").doc(doc.id).collection('Subjects')
            .where("name", "==",subject)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc1) => {
                dispatch({
                    type:actionTypes.SET_TEACHER_SUBJECT_ID,
                    teacherSubjectId:doc1.id,
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


        // db.collection("students").doc(user.uid).collection("courses")
        // .where("name", "==",course)
        // .get()
        // .then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //       console.log("doc?.id",doc?.id)
        //     dispatch({
        //       type:actionTypes.SET_USER_COURSEID,
        //       userCourseId:doc.id,
        //     })
        //     db.collection("students").doc(user.uid).collection("courses").doc(doc.id).collection("subjects")
        //     .where("name", "==",subject)
        //     .get()
        //     .then((querySnapshot) => {
        //       querySnapshot.forEach((doc1) => {
        //         dispatch({
        //            type : actionTypes.SET_USER_SUBJECTID,
        //            userSubjectId : doc1.id,
        //         })
        //       });
        //     })
        //     .catch((error) => {
        //       console.log("Error getting documents: ", error);
        //     });
        //   });
        // })
        // .catch((error) => {
        //   console.log("Error getting documents: ", error);
        // });
      }
      dispatch({
        type:actionTypes.SET_SHOW_DIV,
        showDiv:!showDiv,
      })
      }
  
  return (
    <div>
      <div onClick={selectSubject}>{subject}</div>
    </div>
  );
}

export default HeaderSubjectTeacher;
