import React from 'react'
import styled from "styled-components"
import {useHistory} from "react-router-dom";
import { useStateValue } from "../../../../StateProvider";
import { actionTypes } from "../../../../reducer";

function StudentName({name}) {
    const[{} , dispatch] = useStateValue();
    const history = useHistory();
    const openChatPage = (e) => {
        e.preventDefault();
        dispatch({
            type : actionTypes.SET_CHATNAME,
            chatName : name
        })
        history.push("/doubtsMessagesPageForTeachers");
    }

    const openChat = (e) => {
        e.preventDefault();
        dispatch({
            type : actionTypes.SET_CHATNAME,
            chatName : name
        })
    }
    return (
       <>
        <Container>
          <p className = "name" onClick={openChat}>{name}</p>
          <p className = "name_for_mobile" onClick={openChatPage}>{name}</p>
        </Container>
       </>
    )
};

const Container  = styled.div`
border-bottom: 1px solid lightgray;
 p{
     padding: 10px;
     margin-bottom : 10px;
     font-size : 18px;
 }
 .name_for_mobile{
     display: none ;
 }
 @media(max-width:500px){
    .name{
        display : none;
    }
    .name_for_mobile{
     display : flex; ;
 }
}
 
 &:hover{
     cursor: pointer;
     background-color : #ecebeb
 }
`;

export default StudentName
