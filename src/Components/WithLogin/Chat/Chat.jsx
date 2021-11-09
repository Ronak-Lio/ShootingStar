import React, { useState,useEffect } from "react";
import "./Chat.css";
import SendIcon from "@mui/icons-material/Send";import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from "react-router";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import db from "../../../firebase";
import Chatmsg from "./Chatmsg";
import { useStateValue } from "../../../StateProvider";
import firebase from 'firebase'

function Chat() {
  const [{ signInAs, user, course_Subject, course_Main,course_SubjectID,course_MainID ,teacherCourseId,teacherSubjectId}, dispatch] =useStateValue();
  const [input, setInput] = useState("");
  const [shareImage, setShareImage] = useState('');
  const [messages,setMessages]=useState([]);
  const history=useHistory()
  var today = new Date();
  var datetime = today.toLocaleString()
  var dateC=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === '' || image === undefined) {
        alert(`not an image, the file is a ${typeof image}`);
        return;
    }
    setShareImage(image);
};

  const sendMessage=(e)=>{
    e.preventDefault();
        if(course_MainID && course_SubjectID && input){
          db.collection("Courses").doc(course_MainID).collection("Subjects").doc(course_SubjectID).collection('chat').add({
            message:input,
            name:user?.email,
            date:datetime,
            sendby:signInAs?.name,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          }).then(()=>{
            setInput('');
          })
      }
  }
  // useEffect(() => {
  //   if (user?.uid) {
  //     db.collection("students")
  //       .doc(user?.uid)
  //       .collection("courses")
  //       .onSnapshot((snapshot) =>
  //         setCoursesArray(
  //           snapshot.docs.map((doc) => ({
  //             data: doc.data(),
  //             id: doc.id,
  //           }))
  //         )
  //       );
  //   }
  // }, [user]);
  useEffect(()=>{
    if(course_SubjectID && course_MainID &&  course_Main){
    db.collection("Courses").doc(course_MainID).collection("Subjects").doc(course_SubjectID).collection('chat').orderBy("timestamp", "desc").onSnapshot((snapshot)=>{
      setMessages(snapshot.docs.map((doc)=>({
        data:doc.data(),
        id:doc.id,
      })))
    })
  }
  },[course_SubjectID,course_MainID, course_Main])
  console.log(course_MainID)
  return (
    <div className="chat">
      <div className="chat__header">
       <div className="chat__headerFirst">
         <div className="chat__headerFirst__back" onClick={()=>history.push('/main')}>
           <IconButton>
            <ArrowBackIcon />
            </IconButton>
         </div>
         <div className="chat__headerFirst__account">
           {course_Subject && course_Subject }
         </div>
       </div>
      </div>
      <div className="chat__body">
            {messages.map((message)=>(
          <div className={message.data?.name===user?.email?"chat__msgBox":"chat__msgBoxNot"}>
          <Chatmsg message={message} />
          </div>
            ))}
      </div>
      <form>
      <div className="doubtBox_footer">
            <div className="send_Message_box">
              <input type="text" placeholder="Type a message... " value={input} onChange={e=>setInput(e.target.value)} />
              <div className="icons">
                <AttachFileIcon className="attach_file_icon icon"  />
                <button type="submit" className="send_icon icon" onClick={sendMessage}><SendIcon/></button>
              </div>
            </div>
          </div>
      </form>
    </div>
  );
}

export default Chat;
