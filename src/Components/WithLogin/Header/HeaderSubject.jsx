import React from "react";
import db from "../../../firebase";
import { actionTypes } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";

function HeaderSubject({ subject, course }) {
  const [{ signInAs,showDiv, user, course_SubjectID,course_MainID}, dispatch]=useStateValue();
  const selectSubject=()=> {
    if(subject){
      console.log("objectobjectobject",course)
        db.collection("Courses")
        .where("name", "==",course)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log("doc?.id",doc?.id)
            db.collection("Courses").doc(doc.id).collection('Subjects')
            .where("name", "==",subject)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc1) => {
                if(!signInAs?.currentCourse){
                  db.collection('users').doc(user.uid).set({
                    currentCourse:course,
                    currentSubject:subject,
                    currentCourseID:doc?.id,
                    currentSubjectID:doc1.id,
                    name:signInAs.name,
                    value:signInAs.value,
                  })
                }else{
                  db.collection('users').doc(user.uid).update({
                    currentCourse:course,
                    currentSubject:subject,
                    currentCourseID:doc?.id,
                    currentSubjectID:doc1.id,
                    name:signInAs.name,
                    value:signInAs.value,
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
