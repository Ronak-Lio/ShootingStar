import React , {useState , useEffect} from 'react'
import styled from "styled-components"
import {useStateValue} from "../../StateProvider"
import CloseIcon from '@mui/icons-material/Close';
import {actionTypes} from "../../reducer"
import {Link , useHistory} from "react-router-dom"

function SigInPopup() {
    const[{openSignInPopup} , dispatch] = useStateValue();
    const history = useHistory();
    const signInAs_Student = (e) => {
        dispatch({
            type : actionTypes.SIGN_IN_AS,
            signInAs : "student"
        });
        history.push("/signIn");
    }
    const signInAs_teacher = (e) => {
        dispatch({
            type : actionTypes.SIGN_IN_AS,
            signInAs : "teacher"
        });
        history.push("/signIn")
    }

    const signInAs_admin = (e) => {
        dispatch({
            type : actionTypes.SIGN_IN_AS,
            signInAs : "admin"
        })
        history.push("/signIn")
    }


    const closePopup = () => {
        dispatch({
            type : actionTypes.OPEN_SIGNINPOPUP,
          openSignInPopup : false,
        })
    }
    return (
       <div className="signInPopup">
          {openSignInPopup === true && (
            <Container>
               <div className="popup">
                <div className="popup_header">
                  <CloseIcon className="close_icon" onClick = {closePopup}/>
                </div>
                <div className="all_buttons">
                <button className="sign_In_button" onClick = {signInAs_Student}>
                     Sign in as a student
                 </button>
                 <button className="sign_In_button" onClick = {signInAs_teacher}>
                     Sign in as a teacher
                 </button>
                 <button className="sign_In_button" onClick = {signInAs_admin}>
                     Sign in as an admin
                 </button>
                </div>
               </div>
            </Container>
          )}
       </div>
    )
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

  .popup{
    background-color: #fff;
    width : 400px;
    height : 300px;
    margin: auto;
    border-radius: 7px;
    box-shadow : 0 0 15px rgba(0,0,0,0.24);
    display: flex;
    flex-direction: column;
  }

  .popup_header{
      padding: 10px;
      display: flex;
      justify-content: flex-end;
  }

  .close_icon{
      margin-right : 5px;
      font-size : 27px;
      &:hover{
          color : #6d6969;
          cursor: pointer;
      }
  }

  .all_buttons{
    width: 100%;
    height : 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top : auto;

  }

  .sign_In_button{
    width : 70%;
    height : 15%;
    margin-left : auto;
    margin-right : auto;
    margin-bottom : 30px;
    border-radius :20px;
    background-color : #fff;
     &:hover{
         background-color : lightgray;
     }

  }

  @media(max-width:500px){
       .popup{
        width : 70vw;
       }
    }
`;



export default SigInPopup
