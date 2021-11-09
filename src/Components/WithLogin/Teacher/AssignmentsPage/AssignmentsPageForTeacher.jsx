import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import HeaderMain from "../../Header/HeaderMain";
import "./AssignmentsPageForTeacher.css";
import Assignment from "./Assignment";
import AssignmentPopup from "./AssignmentPopup";
import { useStateValue } from "../../../../StateProvider";
import CreateAssignmentPopup from "./CreateAssignmentPopup";
import { actionTypes } from "../../../../reducer";
import HeaderTeacher from "../HeaderTeacher/HeaderTeacher";
import db from "../../../../firebase";

function AssignmentsPageForTeacher() {
  const [
    {
      openCreateAssignmentPopup,
      user,
      teacherCourseId,
      teacherSubjectId,
      signInAs,
      assignmentTeacherDetails
    },
    dispatch,
  ] = useStateValue();
  const[assignments , setAssignments] = useState([]);
  useEffect(() => {
    if (user && teacherCourseId && teacherSubjectId) {
      console.log("Teacer Course Id is ", teacherCourseId);
      db.collection("Courses")
        .doc(teacherCourseId)
        .collection("Subjects")
        .doc(teacherSubjectId)
        .collection("assignments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setAssignments(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id
            }))
          );
        });
    }
  }, [user , teacherCourseId , teacherSubjectId , assignments.length , assignmentTeacherDetails]);
  const open_create_assignment_popup = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.OPEN_CREATE_ASSIGNMENT_POPUP,
      openCreateAssignmentPopup: true,
    });
    dispatch({
      type : actionTypes.CREATE_ASSIGNMENT_DETAILS,
      createAssignmentDetails : []
    })
  };
  return (
    <div className="assignmentsPageforTeacher">
      <HeaderTeacher />
      <Container>
        <Assignments>
          <div className="assignmentsPageforTeacher_header">
            <p className="heading">Assignments</p>
            <button onClick={open_create_assignment_popup}>
              Create Assignment
            </button>
          </div>
          <div className="assignmentout">
            <div className="assignments_div">
            {assignments.map((assignment) => 
             <Assignment name = {assignment.data.name} description = {assignment.data.description} date = {assignment.data.submissionDate} assignmentUrl = {assignment.data.assignmentUrl} assignmentUploadedName = {assignment.data.assignmentUploadedName} id = {assignment.id} />
            )}
            </div>
          </div>
        </Assignments>
      </Container>
      {assignmentTeacherDetails && (<AssignmentPopup />)}
      <CreateAssignmentPopup />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;

  .assignmentsPageforTeacher_header {
    display: flex;
    justify-content: space-around;
    button {
      height: 40px;
      border-radius: 20px;
      width: 200px;
      background-color: #fff;
      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }
  .heading {
    text-align: center;
    font-size: 20px;
  }
`;

const Assignments = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  .assignmentout {
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
  }
  .assignments_div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 25px;
  }

  @media (max-width: 1184px) {
    flex: 1;
    .notices {
      display: none;
    }
  }
`;

export default AssignmentsPageForTeacher;
