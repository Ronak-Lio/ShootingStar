import React , {useState, useEffect} from "react";
import styled from "styled-components";
import { useStateValue } from "../../../../StateProvider";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from "../../../../reducer";
import StudentAssignmentStatus from "./StudentAssignmentStatus";
import db , {storage} from "../../../../firebase"

function AssignmentPopup() {
  const [{ openAssignmentPopupForTeacher , assignmentTeacherDetails , teacherSubjectId , teacherCourseId , user }, dispatch] = useStateValue();
  const[answers , setAnswers] = useState([]);


  useEffect(() => {
    if(user && teacherCourseId && teacherSubjectId && assignmentTeacherDetails?.name){
    console.log(assignmentTeacherDetails) 
    db.collection("Courses")
    .doc(teacherCourseId)
    .collection("Subjects")
    .doc(teacherSubjectId)
    .collection("assignments")
    .where("name", "==", assignmentTeacherDetails?.name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        db.collection("Courses")
          .doc(teacherCourseId)
          .collection("Subjects")
          .doc(teacherSubjectId)
          .collection("assignments")
          .doc(doc.id)
          .collection("answers")
          .onSnapshot((snapshot) => 
           setAnswers(
            snapshot.docs.map((doc) => ({
              id : doc.id,
              data: doc.data(),
            }))
           )
          )
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
    }
  } , [assignmentTeacherDetails , answers.length])
  const close_assignment_details = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.OPEN_ASSIGNMENT_POPUP_FOR_TEACHER,
      openAsignmentPopupForTeacher: false,
    });
    dispatch({
      type : actionTypes.SET_ASSIGNMENT_TEACHER_DETAILS,
      assignmentTeacherDetails : []
  })
  };
  return (
    <>
      {openAssignmentPopupForTeacher === true && (
        <Container>
          <div className="assignment_details">
            <div className="assignment_details_close">
              <p>{assignmentTeacherDetails?.name}</p>
              <CloseIcon
                className="assignment_details_close_icon"
                onClick={close_assignment_details}
              />
            </div>
            <div className="assignment_details_details">
              <div className="assignment_given_details">
              <div className = "assignment_description">
                {assignmentTeacherDetails?.description}
              </div>
             {assignmentTeacherDetails?.assignmentUrl && (
                <div className="assignment_attatched">
                <a href = {assignmentTeacherDetails?.assignmentUrl}>
                  {assignmentTeacherDetails?.assignmentUploadedName}
                </a>
              </div>
             )}
              </div>
              <div className="students_assignment_report">
               {answers.map((answer) => 
                <StudentAssignmentStatus name  = {answer.data.name} answerUrl = {answer.data.answerUrl} fileName = {answer.data.fileName} assignmentName = {assignmentTeacherDetails?.name}/>
               )}
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .assignment_details{
    background-color: #fff;
    width: 600px;
    height: fit-content;
    max-height : 600px;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .assignment_details_close {
    display: flex;
    justify-content: flex-end;
    p {
      text-align: center;
      width: 100%;
    }
  }

  .assignment_details_close_icon {
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

  .assignment_details_details{
      display: flex;
  }

  .assignment_given_details{
      flex : 0.45;
      padding : 10px;
      padding-top : 0px;
      .assignment_description{
          max-height : 490px ;
          overflow-y : scroll;
          margin-bottom : 10px;
      }

    .assignment_attached {
    background-color: lightgray;
    padding: 7px;
    padding-left: 15px;
    width: 95%;
    border-radius: 10px;
    margin-bottom : 10px;
  }
  }

  .assignment_attatched {
    background-color: lightgray;
    padding: 7px;
    padding-left: 15px;
    width: 90%;
    border-radius: 10px;
    margin-bottom: 10px;

    a{
      text-decoration: none;
      color : black;
       
    }

    &:hover {
      background-color : #e2e0e0;
    }
  }

  .students_assignment_report{
      display: flex;
      flex-direction: column;
      flex : 0.55;
      overflow-y : scroll;
  }

  @media (max-width: 700px) {
    .assignment_details {
      width: 80vw;
    }
  }

  @media (max-width: 600px) {
    .assignment_details {
      width: 80vw;
    }
    .assignment_description{
        font-size: 14px;
    }

  }
`;

export default AssignmentPopup;
