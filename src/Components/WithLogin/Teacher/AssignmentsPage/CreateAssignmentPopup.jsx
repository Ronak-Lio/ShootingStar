import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../../../StateProvider";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from "../../../../reducer";

function CreateAssignmentPopup() {
  const [{ openCreateAssignmentPopup }, dispatch] = useStateValue();

  const close_popup = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.OPEN_CREATE_ASSIGNMENT_POPUP,
      openCreateAssignmentPopup: false,
    });
  };
  return (
    <>
      {openCreateAssignmentPopup === true && (
        <Container>
          <div className="create_assignment">
            <div className="popup_close">
              <CloseIcon className="close_icon" onClick={close_popup} />
            </div>
            <div className="set_assignment_name">
              <p>Assignment Name:</p>
              <input type="text" placeholder="Set assignment name" />
            </div>
            <div className="set_assignment_description">
              <p>Assignmnet description:</p>
              <textarea name="" id="" cols="30" rows="10" placeholder = "Type assignment description"></textarea>
            </div>
            <div className="set_assignment_due_date">
                <p>Assignment Submission date:</p>
                <input type="date" />
            </div>
            <div className="create_assignment_button_div">
                <button>Create</button>
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

  .create_assignment {
    background-color: #fff;
    width: 600px;
    height: fit-content;
    max-height: 600px;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
    padding-left : 15px;

    .popup_close {
      display: flex;
      justify-content: flex-end;
    }

    .close_icon {
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }

    .set_assignment_name {
      display: flex;
      justify-content: space-between;
      width: 90%;
      input {
        width: 60%;
        border-radius: 6px;
        padding-left: 9px;
        padding-right: 5px;
        border: 1px solid gray;
        outline-width: 0px;
      }
      p {
        margin-top: 5px;
      }
    }
    .set_assignment_description {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 10px;
      p {
        margin-bottom: 7px;
      }
      textarea {
        width: 92%;
        outline-width: 0px;
        font-size: 13px;
        resize: none;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px;
        padding-left : 10px;
        padding-right : 10px;
      }
    }

    .set_assignment_due_date{
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin-top : 20px; 

      input {
        border-radius: 6px;
        padding-left: 9px;
        padding-right: 5px;
        border: 1px solid gray;
        outline-width: 0px;
        width : 50%;
      }
      p {
        margin-top: 5px;
      }
    }

    .create_assignment_button_div{
      display: flex;
      justify-content: flex-end;
      margin-top : 20px;
      margin-right: 10px;
      button{
        width : 100px;
          border-radius : 20px;
          background-color : #1183e0;
          color : white;
          &:hover{
              cursor : pointer;
              background-color : #63b3f5;
          }
      }  
    }
  }
`;

export default CreateAssignmentPopup;
