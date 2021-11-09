import React  from 'react'
import styled from "styled-components"
import {useStateValue} from  "../../../StateProvider"
import {actionTypes} from "../../../reducer"

function Assignment({name , description , date , status , assignmentUrl , assignmentUploadedName}) {
    const[{openAsignmentPopup} , dispatch] = useStateValue();
    const open_assignment_details = (e) => {
      e.preventDefault();
      dispatch({
          type : actionTypes.OPEN_ASSIGNMENT_POPUP,
          openAsignmentPopup : true,
      });
      if(assignmentUrl){
        dispatch({
            type : actionTypes.SET_ASSIGNMENT_STUDENT_DETAILS,
            assignmentStudentDetails : {
                name : name,
                description : description,
                date : date,
                assignmentUrl : assignmentUrl,
                assignmentUploadedName : assignmentUploadedName,
            }
        })
    }else{
        dispatch({
            type : actionTypes.SET_ASSIGNMENT_STUDENT_DETAILS,
            assignmentStudentDetails : {
                name : name,
                description : description,
                date : date,
            }
        })
    }

    };

    const open_submitted_assignment_details = (e) => {
        e.preventDefault();
        dispatch({
            type : actionTypes.OPEN_VIEW_ASSIGNMENT_POPUP,
            openViewAssignmentPopup : true,
        });
        if(assignmentUrl){
            dispatch({
                type : actionTypes.SET_ASSIGNMENT_STUDENT_DETAILS,
                assignmentStudentDetails : {
                    name : name,
                    description : description,
                    date : date,
                    assignmentUrl : assignmentUrl,
                    assignmentUploadedName : assignmentUploadedName,
                }
            })
        }else{
            dispatch({
                type : actionTypes.SET_ASSIGNMENT_STUDENT_DETAILS,
                assignmentStudentDetails : {
                    name : name,
                    description : description,
                    date : date,
                }
            })
        }
    }
     return (
        <div className = 'assignment'>
         <Container>
           <p className="assignment_title">{name}</p>
            <p className="assignment_description">
            {description?.length <= 70 ? <>{description}</> : <>{description?.slice(0, 70)}...</>}
            </p>
            <p className="asssignment_due_date">Due date: {date}</p>
            <div className="submit_button">
                {status === "submitted"?(
                    <button onClick = {open_submitted_assignment_details}>View</button>
                ):(
                    <button onClick = {open_assignment_details}>Submit</button>
                )}
            </div>
         </Container>  
        </div>
    )
};

const Container = styled.div`
 background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 3px 10px 10px 10px;
  width: 230px;
  height: 220px;
  margin: 15px;
  box-shadow: 0 0 2px 2px rgba(163, 162, 162, 0.35);
  padding-left : 15px;
 
  .assignment_description {
      font-size : 12px;
      margin-bottom : 15px;
      flex : 1;
  }

  .assignment_title{
      margin-bottom : 5px;
  }
  .asssignment_due_date{
    font-size : 14px;
    font-style : italic;
    font-weight : 400;
  }

  .submit_button{
      display : flex;
      justify-content : flex-end;
      button{
          width : 70px;
          border-radius : 20px;
          background-color : #1183e0;
          color : white;
          &:hover{
              cursor : pointer;
              background-color : #63b3f5;
          }
      }
  }

  @media(max-width:520px){
      width : 75vw;
      height : fit-content;
  }

  @media(max-width:780px){
      @media(min-width:520px){
          width : 400px;
          height : fit-content;
      }
  }
`;

export default Assignment
