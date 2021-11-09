import React, { useState, useEffect } from "react";
import "./ChatTeacher.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useStateValue } from "../../../../StateProvider";
import db from "../../../../firebase";
import ChatmsgTeacher from "./ChatmsgTeacher";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { display } from "@mui/system";
import firebase from 'firebase'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ImageViewer from 'react-simple-image-viewer';
import CheckDocument from "./CheckDocument";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { actionTypes } from "../../../../reducer";
import { v4 as uuid } from 'uuid';

function ChatTeacher() {
  const [
    {
      signInAs,
      user,
      teacherSubject,
      teacherSubjectId,
      teacherCourseId,
      selectImageChat
    },
    dispatch
  ] = useStateValue();
  const [popupshowImage,setPopupshowImage]=useState(false)
  const [input, setInput] = useState("");
  const[image,setImage]=useState(null);
  const[video,setVideo]=useState([])
  const[doc,setDoc]=useState([])
  const [messages, setMessages] = useState([]);
  const [showTypeFile, setShowTypeFile] = useState(false);
  const history = useHistory();
  var today = new Date();
  var datetime = today.toLocaleString();

  // send message 
  const sendMessage = (e) => {
    e.preventDefault();
    if (teacherCourseId && teacherSubjectId && input) {
      db.collection("Courses")
        .doc(teacherCourseId)
        .collection("Subjects")
        .doc(teacherSubjectId)
        .collection("chat")
        .add({
          message: input,
          name: user?.email,
          date: datetime,
          sendby:signInAs?.name,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setInput('');
        });
    }
  };
  
  // all message
  useEffect(() => {
    if (teacherSubjectId && teacherCourseId) {
      db.collection("Courses")
        .doc(teacherCourseId)
        .collection("Subjects")
        .doc(teacherSubjectId)
        .collection("chat")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          );
        });
    }
  }, [teacherSubjectId, teacherCourseId]);
  
//  select image
const selectImage=(e)=>{
  if (e.target.files[0]) {
    // setImage(e.target.files[0]);
    dispatch({
      type:actionTypes.SET_CHAT_SELECT_IMAGE,
      selectImageChat:e.target.files[0],
    })
    setPopupshowImage(!popupshowImage);
    // if(selectImageChat){
      // history.push('/checkdocument')
    // }
    setShowTypeFile(!showTypeFile)
  }
}

return (
    <>
    {popupshowImage && (
          <div className="popupImage">
            <div className="popupImageIn">
              <div className="popupImageIntop">
                <div className="nameImage">Selected Document</div>
                <div
                  className="BackiconImage"
                  onClick={() => setPopupshowImage(!popupshowImage)}
                >
                  
                  <ClearRoundedIcon className="BackiconiImage" />
                </div>
              </div>
              <div className="popupbodyImage">
                <div className="popupbody_Image">
                {image && <img src={URL.createObjectURL(image)} className="popupbody_Image" alt=""/>}
                </div>
                <div className="button">
                  <input placeholder={'Caption'} type="text"  />
                 <div className="sendDiv">
                 <SendRoundedIcon id={'sendicon'} fontSize={'large'}/>
                 </div>
                </div>
              </div>
            </div>
          </div>
        )}
    <div className="chatTeacher">
      <div className="chatTeacher__header">
        <div className="chatTeacher__headerFirst">
          <div
            className="chatTeacher__headerFirst__back"
            onClick={() => history.push("/main")}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className="chatTeacher__headerFirst__account">
            {teacherSubject}
          </div>
        </div>
      </div>
      {<div className="chatTeacher__body">
        {messages.map((message) => (
          <div
            className={
              message.data?.name === user?.email
                ? "chatTeacher__msgBox"
                : "chatTeacher__msgBoxNot"
            }
          >
            <ChatmsgTeacher message={message} />
          </div>
        ))}
      </div>}
      <form>
      <div className="doubtBox_footer">
        <div className="send_Message_box">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="iconsTeacher">
            {showTypeFile && <div className="showtypeFile">
              <div className="show_typeImage">
                <label htmlFor="image">
                <ImageRoundedIcon/>
                </label>
                <input type="file" id={'image'} style={{display:'none'}}  onChange={selectImage} accept="image/git , image/jpeg , image/png"/>
              </div>
              <div className="show_typeVideo">
              <label htmlFor="video">
              <VideoLibraryRoundedIcon/></label>
                <input type="file" id={'video'} style={{display:'none'}} value={video} onChange={e=>{
                  setVideo(e.target.value)}} accept="image/mp3 , image/mp4 "/>
              </div>
              <div className="show_typeDocument" >
              <label htmlFor="doc">
              <InsertDriveFileRoundedIcon/>
                </label>
                <input type="file" id={'doc'} style={{display:'none'}} value={doc} onChange={e=>{
                  setDoc(e.target.value)}} accept="image/pdf , image/html , image/js"/>
              </div>
            </div>}
          <AttachFileIcon
              className="icon"
              onClick={() => {
                setShowTypeFile(!showTypeFile);
              }}
            />
            <button type="submit" className="icon" onClick={sendMessage}><SendIcon/></button>
          </div>
        </div>
      </div>
      </form>
    </div>
    </>
  );
}

export default ChatTeacher;
