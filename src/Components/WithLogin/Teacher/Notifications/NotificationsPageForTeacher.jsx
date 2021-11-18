import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderTeacher from "../HeaderTeacher/HeaderTeacher";
import Notification from "./Notification";
import { useStateValue } from "../../../../StateProvider";
import db from "../../../../firebase";
import firebase from "firebase";

function NotificationsPageForTeacher() {
  const [{ user, signInAs }, dispatch] = useStateValue();
  const [notifications, setNotifications] = useState([]);
  const[teacherNameId , setTeacherNameId] = useState();
  useEffect(() => {
    if (user && signInAs) {
        db.collection("notificationsForTeachers")
        .where("name", "==", signInAs?.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setTeacherNameId(doc.id)

            db.collection("notificationsForTeachers").doc(doc.id).update({
                lastVisitedNotificationsPage:
                  firebase.firestore.FieldValue.serverTimestamp()
              });

            db.collection("notificationsForTeachers")
              .doc(doc.id)
              .collection("notifications")
              .orderBy("timestamp" , "desc")
              .onSnapshot((snapshot) => 
                setNotifications(
                    snapshot.docs.map((doc) => ({
                        id : doc.id,
                        data : doc.data(),
                    }))
                )
              )
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [user, signInAs]);

  useEffect(() => {
     
  }, [notifications?.length  , teacherNameId ]);

  
  return (
    <>
      <Container>
        <div className="notificationsPage_header">
          <HeaderTeacher />
        </div>
        <div className="notifications">
      {notifications.length > 0 ?(  <>
          {notifications.map((notification) => (
            <Notification notification={notification} teacherNameId = {teacherNameId} />
          ))}
        </>): (
            <p className = "no_notifications">No Notifications</p>
        )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .notifications {
    margin-left: auto;
    margin-right: auto;
    overflow-y: scroll;
    padding-top: 10px;
  }

  .no_notifications{
      font-size : 17px;
  }
`;

export default NotificationsPageForTeacher;
