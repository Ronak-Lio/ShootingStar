import React, { useState, useEffect } from "react";
import "./Main.css";
import Chat from "../Chat/Chat";
import HeaderMain from "../Header/HeaderMain";
import FirstNotices from "../FirstNotices/FirstNotices";
import { useStateValue } from "../../../StateProvider";
import db from "../../../firebase"

function Main() {
  const [{ user }, dispatch] = useStateValue();
  const[notifications , setNotifications] = useState([]);
  const[lastVisitedNotificationsPage , setLastVisitedNotificationsPage] = useState();
  const[newNotifications , setNewNotifications] = useState(0);


  useEffect(() => {
    if (user) {
      db.collection("students")
        .doc(user?.uid)
        .collection("notifications")
        .onSnapshot((snapshot) =>
          setNotifications(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )  
        );

      
    }
  }, [user]);

  useEffect(() => {
     if(notifications?.length > 0) {
         for(let i = 0; i < notifications?.length; i++){
             if(notifications[i]?.data?.timestamp?.valueOf() > lastVisitedNotificationsPage?.valueOf()) {
                 setNewNotifications(newNotifications + 1);
             }
         }
     }
  } , [notifications?.length]);

  useEffect(() => {
     console.log("New Notifications are "  ,newNotifications)
  } , [newNotifications])
  return (
    <div className="main">
      <HeaderMain />
      {/* </div> */}
      <div className="mainBody">
        <div className="mainBodyIN">
          <div id="chat">
            <Chat />
          </div>
          <div id="noti">
            <FirstNotices />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
