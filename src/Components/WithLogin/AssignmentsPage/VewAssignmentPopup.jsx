import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from "../../../reducer";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";

function VewAssignmentPopup() {
  const [
    {
      openViewAssignmentPopup,
      assignmentStudentDetails,
      userSubjectId,
      userCourseId,
      user,
    },
    dispatch,
  ] = useStateValue();
  const [submittedAssignmentDetails, setSubmittedAssignmentDetails] = useState(
    []
  );

  const history = useHistory();

  useEffect(() => {
    if (
      user &&
      userCourseId &&
      userSubjectId &&
      assignmentStudentDetails?.name
    ) {
      db.collection("students")
        .doc(user.uid)
        .collection("courses")
        .doc(userCourseId)
        .collection("subjects")
        .doc(userSubjectId)
        .collection("assignments")
        .where("name", "==", assignmentStudentDetails?.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setSubmittedAssignmentDetails(doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [
    user,
    userCourseId,
    userSubjectId,
    assignmentStudentDetails,
    submittedAssignmentDetails.length,
  ]);

  const close_assignment_details = () => {
    dispatch({
      type: actionTypes.OPEN_VIEW_ASSIGNMENT_POPUP,
      openViewAssignmentPopup: false,
    });
    dispatch({
      type: actionTypes.SET_ASSIGNMENT_STUDENT_DETAILS,
      assignmentStudentDetails: [],
    });
  };

  const view_given_assignment_pdf = (e) => {
    e.preventDefault();
    history.push("/viewPdf");
    dispatch({
      type : actionTypes.SET_VIEW_PDF,
      viewPdf : true
    });
    dispatch({
      type : actionTypes.SET_PDF_URL,
      pdfUrl : assignmentStudentDetails?.assignmentUrl
    })
  };
  
  const view_submitted_assignment_pdf = (e) => {
    e.preventDefault();
    history.push("/viewPdf")
    dispatch({
      type : actionTypes.SET_VIEW_PDF,
      viewPdf : true
    });
    dispatch({
      type : actionTypes.SET_PDF_URL,
      pdfUrl : submittedAssignmentDetails?.answerUrl
    })
  };

  const view_corrected_assignmnent_pdf = (e) => {
    e.preventDefault();
    history.push("/viewPdf")
    dispatch({
      type : actionTypes.SET_VIEW_PDF,
      viewPdf : true
    });
    dispatch({
      type : actionTypes.SET_PDF_URL,
      pdfUrl : submittedAssignmentDetails?.correctedAssignmentUrl
    })
  }

  return (
    <>
      {openViewAssignmentPopup === true && (
        <Container>
          <div className="view_assignment">
            <div className="assignment_details_close">
              <p className="assignment_details_title">
                {assignmentStudentDetails?.name}
              </p>
              <CloseIcon
                className="assignment_details_close_icon"
                onClick={close_assignment_details}
              />
            </div>
            <p className="assignment_details_description">
              {assignmentStudentDetails?.description}
            </p>
            {submittedAssignmentDetails?.assignmentUrl && (
              <div
                className="assignment_attatched"
                onClick={view_given_assignment_pdf}
              >
                <p>{assignmentStudentDetails?.assignmentUploadedName}</p>
              </div>
            )}
            <div className="assignment_submitted">
              <p className="submitted_assignment">Submitted Assignment:</p>
                <p className = "file_name" onClick = {view_submitted_assignment_pdf}>{submittedAssignmentDetails?.answerFileName}</p>
            </div>
            {submittedAssignmentDetails?.marks && (
              <div className="marks_container">
                <p>Marks:</p>
                <span>{submittedAssignmentDetails?.marks}</span>
              </div>
            )}
            {submittedAssignmentDetails?.correctedAssignmentUrl && (
              <div className="assignment_submitted">
                <p className="submitted_assignment">Assignment Returned:</p>
                  <p className = "file_name" onClick = {view_corrected_assignmnent_pdf}>{submittedAssignmentDetails?.correctedAssignmentName}</p>
              </div>
            )}
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

  .view_assignment {
    background-color: #fff;
    width: 450px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .assignment_details_close {
    display: flex;
    justify-content: space-between;
    p {
      width: 100%;
      text-align: center;
    }
  }

  .assignment_details_close_icon {
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

  .assignment_attatched {
    background-color: lightgray;
    padding: 7px;
    padding-left: 15px;
    width: 90%;
    border-radius: 10px;
    
    p{
      max-width : 100%;
      overflow-x : hidden;
      margin-bottom : 0px;
    }

    &:hover {
      background-color : #e2e0e0;
      cursor: pointer;
    }


  }

  .submitted_assignment {
    margin-top: 10px;
    margin-bottom: 0px;
  }

  .assignment_submitted{
    font-size: 15px;

    .file_name{
      max-width : 90%;
      overflow-x : hidden;
      margin-bottom : 0px;
      text-decoration : underline;

      &:hover {
      color: blue;
      cursor: pointer;
    }

    }
  }

  .marks_container {
    display: flex;
    margin-top: 10px;
    span {
      margin-left: 3px;
      padding: 0px;
    }
    p {
      margin-bottom: 0px;
    }
  }
`;

export default VewAssignmentPopup;
