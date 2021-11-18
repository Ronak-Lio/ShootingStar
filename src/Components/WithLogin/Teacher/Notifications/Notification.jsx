import React , {useState , useEffect} from 'react'
import styled from "styled-components"
import DeleteIcon from "@mui/icons-material/Delete";
import {useStateValue} from "../../../../StateProvider"
import db from "../../../../firebase";
import {useHistory} from "react-router-dom"

function Notification({notification , teacherNameId}) {
    const[{user , signInAs} , dispatch] = useStateValue();
    const history = useHistory();
    
    

    const delete_notification = (e) => {
        e.preventDefault();
        db.collection("notificationsForTeachers")
        .doc(teacherNameId)
        .collection("notifications")
        .doc(notification?.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }

    return (
        <> 
         <Container>
          {notification?.data?.message1 && (
                <p className  = "message1">{notification?.data?.message1}</p>
          )}
            <p>
                {notification?.data?.message2}
            </p>
           <div className="bottom_component">
             <DeleteIcon className="delete_icon" onClick={delete_notification}/>
           <p className = "timestamp">
           {new Date(notification?.data?.timestamp?.toDate()).toUTCString()}
            </p>
           </div>
         </Container>
        </>
    )
};

const Container  = styled.div`
 display : flex;
 flex-direction : column;
 background-color : #eee;
 padding : 10px;
 border-radius : 10px;
 margin-bottom : 10px;
 width : 400px;

 p{
     margin-bottom : 0px;
     font-size : 14px;
 }

 .bottom_component{
    display : flex;
    justify-content : space-between;
    margin-top : 5px;
    .timestamp {
     display : flex;
     justify-content : flex-end;
     font-size : x-small;
 }
 }

 .delete_icon{
     font-size : 15px;
     color : #505050;

     &:hover {
         cursor : pointer;
         color : gray;
     }
 }

 .message1{
     margin-bottom : 3px;
     font-size : 17px;
 }

 @media (max-width: 450px) {
     width : 350px;
 }

 &:hover {
     cursor : pointer;
 }
`;


export default Notification
