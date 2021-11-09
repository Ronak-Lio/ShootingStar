import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import db from "../../../../firebase";
import { useHistory } from "react-router-dom";
import { actionTypes } from "../../../../reducer";
import { useStateValue } from "../../../../StateProvider";

function StudentAssignmentStatus({
  name,
  answerUrl,
  fileName,
  assignmentName,
  submissionDate,
}) {
  const [submissiondetails, setSubmissionDetails] = useState(false);
  const history = useHistory();
  const [
    { teacherCourseId, teacherSubjectId, user, assignmentTeacherDetails },
    dispatch,
  ] = useStateValue();
  const [checkedAssignmentDetails, setCheckedAssignmentDetails] = useState([]);
  const [lateSubmitted, setLateSubmitted] = useState(false);

  useEffect(() => {
    if (user && teacherSubjectId && teacherCourseId && name && assignmentName) {
      db.collection("Courses")
        .doc(teacherCourseId)
        .collection("Subjects")
        .doc(teacherSubjectId)
        .collection("assignments")
        .where("name", "==", assignmentName)
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
              .where("name", "==", name)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc1) => {
                  console.log(doc1.id, "=>", doc1.data());
                  db.collection("Courses")
                    .doc(teacherCourseId)
                    .collection("Subjects")
                    .doc(teacherSubjectId)
                    .collection("assignments")
                    .doc(doc.id)
                    .collection("answers")
                    .doc(doc1.id)
                    .onSnapshot((snapshot) =>
                      setCheckedAssignmentDetails(snapshot.data())
                    );
                });
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    console.log(checkedAssignmentDetails);
  }, [submissiondetails, checkedAssignmentDetails?.length]);

  useEffect(() => {
    console.log("Ran");
    console.log(
      "CHECKED ASSIGNMENT DETAILS ARE",
      checkedAssignmentDetails?.timestamp
    );
    if (checkedAssignmentDetails?.timestamp) {
      console.log(checkedAssignmentDetails?.timestamp);

      console.log(submissionDate);
      var x = parseInt(
        checkedAssignmentDetails?.timestamp[5] +
          checkedAssignmentDetails?.timestamp[6]
      );
      var y = parseInt(
        checkedAssignmentDetails?.timestamp[8] +
          checkedAssignmentDetails?.timestamp[9]
      );
      var z = parseInt(
        checkedAssignmentDetails?.timestamp[0] +
          checkedAssignmentDetails?.timestamp[1] +
          checkedAssignmentDetails?.timestamp[2] +
          checkedAssignmentDetails?.timestamp[3]
      );

      var a = parseInt(submissionDate[5] + submissionDate[6]);
      var b = parseInt(submissionDate[8] + submissionDate[9]);
      var c = parseInt(
        submissionDate[0] +
          submissionDate[1] +
          submissionDate[2] +
          submissionDate[3]
      );
      if (
        z > c ||
        (z == c && x > a) ||
        (z == c && x == a && y > b) ||
        (z == c && x == a && y == b)
      ) {
        setLateSubmitted(true);
      }
    }
  }, [checkedAssignmentDetails.length, lateSubmitted]);
  const view_details = (e) => {
    e.preventDefault();
    setSubmissionDetails(true);
  };

  const close_details = (e) => {
    e.preventDefault();
    setSubmissionDetails(false);
  };

  const goToUploadPage = (e) => {
    e.preventDefault();
    history.push("/uploadCorrectedAssignmentPage");
    dispatch({
      type: actionTypes.SET_STUDENT_NAME,
      studentName: name,
    });
    dispatch({
      type: actionTypes.UPLOAD_CORRECTED_ASSIGNMENT,
      uploadCorrectedAssignment: true,
    });
  };

  const view_pdf = (e) => {
    e.preventDefault();
    history.push("/viewPdf");
    dispatch({
      type: actionTypes.SET_VIEW_PDF,
      viewPdf: true,
    });
    dispatch({
      type: actionTypes.SET_PDF_URL,
      pdfUrl: checkedAssignmentDetails?.correctedAssignmentUrl,
    });
  };

  const view_answer_pdf = (e) => {
    e.preventDefault();
    history.push("/viewPdf");
    dispatch({
      type: actionTypes.SET_VIEW_PDF,
      viewPdf: true,
    });
    dispatch({
      type: actionTypes.SET_PDF_URL,
      pdfUrl: answerUrl,
    });
  };

  return (
    <>
      <Container>
        <p className="student_name">{name}</p>
        {submissiondetails === false ? (
          <span onClick={view_details}>View details</span>
        ) : (
          <div className="submission_details">
            <div className="submission_details_close">
              <p className="submitted_assignment">Submitted Assignment:</p>
              <CancelIcon className="cancel_icon" onClick={close_details} />
            </div>
            <div className="submitted_assignment_name">
              <p className="file_name" onClick={view_answer_pdf}>
                {fileName}
              </p>
              {lateSubmitted === true && (
                <div className="late_submission">Late Submission</div>
              )}
            </div>
            {checkedAssignmentDetails?.correctedAssignmentUrl ? (
              <div className="corrected_assignment_details">
                <p>Corrected Assignment:</p>
                <p className="file_name" onClick={view_pdf}>
                  {checkedAssignmentDetails?.correctedAssignmentName}
                </p>
              </div>
            ) : (
              <button onClick={goToUploadPage}>
                Upload corrected assignment
              </button>
            )}
          </div>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;

  .student_name {
    margin-bottom: 0px;
  }
  span {
    font-size: 12px;
    color: blue;
    font-style: italic;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
  .submission_details {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5px;
    margin-top: 5px;
    border-radius: 5px;

    .submitted_assignment {
      font-size: 12px;
      margin-bottom: 0px;
    }

    .submitted_assignment_name {
      font-size: 15px;

      .file_name {
        max-width: 90%;
        overflow-x: hidden;
        margin-bottom: 0px;
        text-decoration: underline;

        &:hover {
          color: blue;
          cursor: pointer;
        }
      }
      span {
        padding: 0px !important;
      }
    }

    button {
      width: fit-content;
      font-size: 13px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      margin-bottom: 5px;
      background-color: #1183e0;
      color: white;
      border-radius: 15px;
      &:hover {
        cursor: pointer;
        background-color: #63b3f5;
      }
    }

    .submission_details_close {
      display: flex;
      justify-content: space-between;
    }

    .cancel_icon {
      font-size: 19px;
      &:hover {
        cursor: pointer;
        color: #6d6969;
      }
    }

    .marks {
      display: flex;
      justify-content: space-between;
      width: 90%;
      p {
        font-size: 14px;
      }
      input {
        height: 25px;
        border-radius: 5px;
        border: 1px solid gray;
        outline-width: 0px;
        padding-left: 8px;
        padding-top: 3px;
        padding-bottom: 3px;
      }
    }
  }

  .late_submission {
    color: white;
    background-color: rgb(255, 0, 0);
    border-radius: 20px;
    width: fit-content;
    padding: 3px;
    font-size: 12px;
    margin-top: 5px;
  }

  .corrected_assignment_details {
    margin-top: 5px;
    p {
      font-size: 12px;
      margin-bottom: 0px;
    }
    .file_name {
      max-width: 90%;
      overflow-x: hidden;
      margin-bottom: 0px;
      text-decoration: underline;
      font-size : 15px;

      &:hover {
        color: blue;
        cursor: pointer;
      }
    }
  }
`;

export default StudentAssignmentStatus;
