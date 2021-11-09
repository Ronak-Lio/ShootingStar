import React from 'react'
import styled from "styled-components"
import {useStateValue} from  "../../../StateProvider"
import {actionTypes} from "../../../reducer"

function Assignment() {
    const[{openAsignmentPopup} , dispatch] = useStateValue();
    const open_assignment_details = (e) => {
      e.preventDefault();
      dispatch({
          type : actionTypes.OPEN_ASSIGNMENT_POPUP,
          openAsignmentPopup : true,
      })
    }
     return (
        <div className = 'assignment'>
         <Container>
           <p className="assignment_title">Assignment 1</p>
            <p className="assignment_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...</p>
            <p className="asssignment_due_date">Due date: 13/12/2020</p>
            <div className="submit_button">
                <button onClick = {open_assignment_details}>Submit</button>
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
