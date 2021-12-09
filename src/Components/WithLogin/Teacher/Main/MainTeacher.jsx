import React , {useState , useEffect} from 'react';
import Chat from '../../Chat/Chat';
import ChatTeacher from '../ChatTeacher/ChatTeacher';
import HeaderTeacher from '../HeaderTeacher/HeaderTeacher';
import NoticesTeacher from '../Notice/NoticesTeacher';
import './MainTeacher.css';
import {useStateValue} from "../../../../StateProvider"
import db from "../../../../firebase"

function MainTeacher() { 
  const [{ user , signInAs }, dispatch] = useStateValue();
  const[notifications , setNotifications] = useState([]);
  const[lastVisitedNotificationsPage , setLastVisitedNotificationsPage] = useState();
  const[newNotifications , setNewNotifications] = useState(0);

  useEffect(() => {
    if (user && signInAs) {
        db.collection("notificationsForTeachers")
        .where("name", "==", signInAs?.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            db.collection("notificationsForTeachers")
              .doc(doc.id)
              .collection("notifications")
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
  }, [user , signInAs]);

  useEffect(() => {
     if(notifications?.length > 0) {
         console.log(notifications)
         for(let i = 0; i < notifications?.length; i++){
            if(notifications[i].data.timestamp.valueOf() > lastVisitedNotificationsPage.valueOf()) {
                setNewNotifications(newNotifications + 1);
            }
         }
     }
  } , [notifications?.length , lastVisitedNotificationsPage]);

  useEffect(() => {
     console.log("New Notifications are "  ,newNotifications)
  } , [newNotifications])


    return (
        <div className="mainteacher">
          <HeaderTeacher/>
          <div className="mainBody">
                <div className="mainBodyIN">
                <div id="chat">
                <ChatTeacher />
                </div>
                <div id="noti">
                <NoticesTeacher/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default MainTeacher;
