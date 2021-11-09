import React from 'react'
import styled from "styled-components"
import {useStateValue} from  "../../../../StateProvider"
import {actionTypes} from "../../../../reducer"
import {useHistory} from "react-router-dom"

function Assignment({name , description , date ,  assignmentUrl , assignmentUploadedName , id}) {
    const[{openAsignmentPopupForTeacher} , dispatch] = useStateValue();
    const history = useHistory();
    const open_assignment_details = (e) => {
        e.preventDefault();
        console.log("Id is" , id)
        history.push(`/ViewAssignment/${id}`);
        dispatch({
            type : actionTypes.SET_ASSIGNMENT_TEACHER_DETAILS,
            assignmentTeacherDetails : {
                name : name,
                description : description,
                assignmentUrl : assignmentUrl,
                id : id
            }
        })
      }
    return (
       <>
          <Container>
           <p className="assignment_title">{name}</p>
            <p className="assignment_description"> {description?.length <= 70 ? <>{description}</> : <>{description?.slice(0, 70)}...</>}</p>
            <p className="asssignment_due_date">Due date: {date}</p>
            <div className="submit_button">
                <button onClick = {open_assignment_details}>View</button>
            </div>
         </Container>  
       </>
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
