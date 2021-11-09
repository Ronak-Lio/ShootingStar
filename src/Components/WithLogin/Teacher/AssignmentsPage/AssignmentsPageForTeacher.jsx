import React , {useState , useEffect} from 'react'
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import HeaderMain from "../../Header/HeaderMain"
import "./AssignmentsPageForTeacher.css"
import Assignment from "./Assignment"
import AssignmentPopup from './AssignmentPopup';
import {useStateValue} from "../../../../StateProvider"
import CreateAssignmentPopup from "./CreateAssignmentPopup";
import { actionTypes } from "../../../../reducer";

function AssignmentsPageForTeacher() {
    const[{} , dispatch] = useStateValue();
     const open_create_assignment_popup = (e) => {
        e.preventDefault();
        dispatch({
            type : actionTypes.OPEN_CREATE_ASSIGNMENT_POPUP,
            openCreateAssignmentPopup : true,
        })
    }
    return (
       <div className="assignmentsPageforTeacher">
         <HeaderMain/>
         <Container>
         <Assignments>
         <div className="assignmentsPageforTeacher_header">
         <p className = "heading">Assignments</p>
         <button onClick = {open_create_assignment_popup}>Create Assignment</button>
         </div>
           <div className="assignmentout">
           <div className="assignments_div">
            <Assignment/>
            <Assignment/>
            <Assignment/>
            <Assignment/>
          </div>
           </div>
         </Assignments>
         </Container>
         <AssignmentPopup/>
         <CreateAssignmentPopup/>
       </div>
    )
};

const Container  = styled.div`
    display: flex;
    flex-direction : row;
    padding-top : 10px;
  
  .assignmentsPageforTeacher_header{
      display: flex;
      justify-content : space-around;
      button{
          height : 40px;
          border-radius : 20px;
          width : 200px;
          background-color : #fff;
          &:hover{
              cursor : pointer;
              background-color : lightgray;
          }

      }
  }
  .heading{
      text-align:center;
      font-size: 20px;
  }
  
`;

const Assignments = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
.assignmentout{
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
}
 .assignments_div{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     padding-left : 25px;
  }

  @media (max-width: 1184px) {
    flex: 1;
    .notices {
      display: none;
    }
  }
`;



export default AssignmentsPageForTeacher
