import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./AssignmentsPage.css";
import Assignment from "./Assignment";
import { useStateValue } from "../../../StateProvider";
import AssignmentPopup from "./AssignmentPopup";
import Notices from "../Notices/Notices";
import { actionTypes } from "../../../reducer";
import NoticePopup from "../Notices/NoticePopup";
import { useHistory } from "react-router-dom";
import HeaderMain from "../Header/HeaderMain";
import db from "../../../firebase";
import VewAssignmentPopup from "./VewAssignmentPopup";
function AssignmentsPage() {
  const [{ openAsignmentPopup, user, signInAs}, dispatch] =
    useStateValue();
  const history = useHistory();
  const [assignments, setAssignments] = useState([]);
  const [dueAssignments, setDueAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  useEffect(() => {
    console.log(user);
    console.log(signInAs?.usercurrentCourseID, "&&&",);
    if (user && signInAs?.usercurrentCourseID && signInAs?.usercurrentSubjectID){
      db.collection("students")
        .doc(user.uid)
        .collection("courses")
        .doc(signInAs?.usercurrentCourseID)
        .collection("subjects")
        .doc(signInAs?.usercurrentSubjectID)
        .collection("assignments")
        .onSnapshot((snapshot) => {
          setAssignments(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          );
        });
    };
    console.log("Assignments are" , assignments)
  }, [user, signInAs?.usercurrentCourseID, signInAs?.usercurrentSubjectID, assignments.length]);

  useEffect(() =>{
     if(assignments.length > 0) {
         for(let i = 0; i < assignments.length; i++) {
           if(assignments[i].data.status === "submitted"){
             submittedAssignments.push(assignments[i])
           }
         }
         for(let i = 0; i < assignments.length; i++) {
          if(assignments[i].data.status === "pending"){
            dueAssignments.push(assignments[i])
          }
        }
     }
  } ,[assignments.length , signInAs?.usercurrentCourseID, signInAs?.usercurrentSubjectID,]);

  useEffect(() =>{
        setSubmittedAssignments([]);
  } , [ user , signInAs?.usercurrentCourseID, signInAs?.usercurrentSubjectID]);
  return (
    <div className="assignmentsPage">
      <div className="assignmentsPage_header">
        <HeaderMain/>
      </div>
      {/* <div className="upcoming_class_div">
        <p>Upcoming Class at 14:33 on Monday</p>
      </div> */}
      <Container>
        <Assignments>
          {dueAssignments.length > 0 && (<>
          <p className="due_assignments">Due Assignments</p>
          <div className="due_assignments_div">
            {console.log("Assignments are" , assignments)}
            {assignments.map((assignment) => (
              <>
                {assignment.data.status === "pending" && (
                  <Assignment
                    name={assignment.data.name}
                    description={assignment.data.description}
                    date={assignment.data.submissionDate}
                    status={assignment.data.status}
                    assignmentUrl={assignment.data.assignmentUrl}
                    assignmentUploadedName={
                      assignment.data.assignmentUploadedName
                    }
                  />
                )}
              </>
            ))}
          </div>
          </>)}
       {submittedAssignments.length > 0 && (   <>
          <p className="submitted_assignments">Submitted Assignments</p>
          <div className="submitted_assignments_div">
            {console.log(assignments)}
          {assignments.map((assignment) => (
              <>
                {assignment.data.status === "submitted" && (
                  <Assignment
                    name={assignment.data.name}
                    description={assignment.data.description}
                    date={assignment.data.submissionDate}
                    status={assignment.data.status}
                    assignmentUrl={assignment.data.assignmentUrl}
                    assignmentUploadedName={
                      assignment.data.assignmentUploadedName
                    }
                  />
                )}
              </>
            ))}
          </div>
          </>)}
        </Assignments>
        <div className="notices">
          <Notices />
        </div>
      </Container>
      <AssignmentPopup />
      <NoticePopup />
      <VewAssignmentPopup />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 88vh;
  padding-top: 10px;
  background-color: #7db3ff;
  overflow-y : scroll;

  .notices {
    flex: 0.3;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-right: 30px;
  }

  @media (max-width: 1184px) {
    .notices {
      display: none;
    }
  }
`;

const Assignments = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  height : fit-content;
  overflow-y : scroll;

  .due_assignments {
    text-align: center;
    font-size: 20px;
  }

  .due_assignments_div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    place-content: center;
  }

  .submitted_assignments_div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
    height : fit-content;
  }

  .submitted_assignments {
    text-align: center;
    font-size: 20px;
  }

  @media (max-width: 1184px) {
    flex: 1;
    .notices {
      display: none;
    }
  }

  @media (max-width: 780px) {
    @media (min-width: 520px) {
      .due_assignments_div {
        flex-direction: column;
      }
    }
  }
`;

export default AssignmentsPage;
