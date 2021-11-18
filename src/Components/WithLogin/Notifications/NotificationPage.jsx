import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderMain from "../Header/HeaderMain";
import Notification from "./Notification";
import { useStateValue } from "../../../StateProvider";
import db from "../../../firebase";
import firebase from "firebase";

function NotificationPage() {
  const [{ user, signInAs }, dispatch] = useStateValue();
  const [notifications, setNotifications] = useState([]);
  const [teacher, setTeacher] = useState();
  useEffect(() => {
    if (user && signInAs) {
      db.collection("students")
        .doc(user?.uid)
        .collection("notifications")
        .orderBy("timestamp" , "desc")
        .onSnapshot((snapshot) =>
          setNotifications(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .onSnapshot((snapshot) => {
          setTeacher(snapshot.data().teacher);
        });
    }
  }, [user, signInAs]);

  useEffect(() => {
    if (user) {
      db.collection("students").doc(user?.uid).update({
        lastVisitedNotificationsPage:
          firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }, [user , notifications?.length]);

  useEffect(() => {}, [teacher]);
  return (
    <>
      <Container>
        <div className="notificationsPage_header">
          <HeaderMain />
        </div>
        <div className="notifications">
         {notifications.length > 0 ? (
              <>
              {notifications.map((notification) => (
                <Notification notification={notification} teacher={teacher} />
              ))}
              </>
         ):(
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
      font-size : 20px;
  } 
`;

export default NotificationPage;
