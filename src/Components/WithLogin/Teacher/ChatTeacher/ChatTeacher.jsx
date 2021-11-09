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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Player } from 'video-react';
import Index from "../../Scroll/Index";


function ChatTeacher() {
  const [
    {
      signInAs,
      user,
      teacherSubject,
      teacherSubjectId,
      teacherCourseId,
    },
    dispatch
  ] = useStateValue();

  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [imageURL, setImagesURL] = useState('');
  const [popupshowImage, setPopupshowImage] = useState(false);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [doc, setDoc] = useState([])
  const [messages, setMessages] = useState([]);
  const [showTypeFile, setShowTypeFile] = useState(false);
  const history = useHistory();


  // scorll work going here
  
  // date
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
          sendby: signInAs?.name,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
        .orderBy("timestamp", "asc")
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
  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPopupshowImage(!popupshowImage);
      setShowTypeFile(!showTypeFile)
    }
  }

  // send image 
  // const sendImage = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   const id = uuid();
  //   const imagesRef = firebase.storage().ref('chatImages').child(id);
  //   await imagesRef.put(image);
  //   imagesRef.getDownloadURL().then((url) => {
  //     if (teacherCourseId && teacherSubjectId) {
  //       db.collection("Courses")
  //         .doc(teacherCourseId)
  //         .collection("Subjects")
  //         .doc(teacherSubjectId)
  //         .collection("chat")
  //         .add({
  //           message: input,
  //           caption: caption,
  //           imageURL: url,
  //           name: user?.email,
  //           date: datetime,
  //           sendby: signInAs?.name,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           imageName:id,
  //         })
  //         .then(() => {
  //           setInput('');
  //           setCaption('');
  //           setPopupshowImage(false);
  //           setLoading(false);
  //         });
  //     }
  //   })
  // }
  // select video 
  const selectVideo = (e) => {
    setLoading(true);
    e.preventDefault();
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
      setPopupshowImage(true);
    }
    setLoading(false);
  }
  // send video 
  // const sendVideo = async(e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (video) {
  //     // setPopupshowImage(true);
  //     const ID = uuid();
  //     const imagesRef = firebase.storage().ref('chatVideo').child(ID);
  //     await imagesRef.put(e.target.files[0]);
  //     imagesRef.getDownloadURL().then((URL) => {
  //       if (teacherCourseId && teacherSubjectId && e.target.files[0]) {
  //         db.collection("Courses")
  //           .doc(teacherCourseId)
  //           .collection("Subjects")
  //           .doc(teacherSubjectId)
  //           .collection("chat")
  //           .add({
  //             message: input,
  //             caption: caption,
  //             videoURL: URL,
  //             name: user?.email,
  //             date: datetime,
  //             sendby: signInAs?.name,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //             videoName:ID,
  //           })
  //           .then(() => {
  //             setInput('');
  //             setCaption('');
  //             // setPopupshowImage(false);
  //             setLoading(false);
  //             setVideo('');
  //             setShowTypeFile(!showTypeFile);
  //           });
  //       }else{
  //         alert('!!!')
  //       }
  //     })
  //   }
  // }l
  const sendDoc = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (video) {
      const ID = uuid();
      const imagesRef = firebase.storage().ref('chatVideo').child(ID);
      await imagesRef.put(video);
      imagesRef.getDownloadURL().then((URL) => {
        if (teacherCourseId && teacherSubjectId && video) {
          db.collection("Courses")
            .doc(teacherCourseId)
            .collection("Subjects")
            .doc(teacherSubjectId)
            .collection("chat")
            .add({
              message: input,
              caption: caption,
              videoURL: URL,
              name: user?.email,
              date: datetime,
              sendby: signInAs?.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              videoName: ID,
              videoOriginalName: video.name,
            })
            .then(() => {
              setInput('');
              setCaption('');
              setPopupshowImage(false);
              setLoading(false);
              setVideo('');
              setShowTypeFile(!showTypeFile);
            });
        } else {
          alert('!!!')
        }
      })
    }
    if (image) {
      const id = uuid();
      const imagesRef = firebase.storage().ref('chatImages').child(id);
      await imagesRef.put(image);
      imagesRef.getDownloadURL().then((url) => {
        if (teacherCourseId && teacherSubjectId) {
          db.collection("Courses")
            .doc(teacherCourseId)
            .collection("Subjects")
            .doc(teacherSubjectId)
            .collection("chat")
            .add({
              message: input,
              caption: caption,
              imageURL: url,
              name: user?.email,
              date: datetime,
              sendby: signInAs?.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageName: id,
              imageOriginalName: image.name,
            })
            .then(() => {
              setInput('');
              setCaption('');
              setPopupshowImage(false);
              setLoading(false);
            });
        }
      })
    }
  }
  return (
    <>
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
        {popupshowImage ? <>
          {loading ? <div className="chatTeacher__body">
            <div className="popupbodyImage_Loading">
              <Box sx={{ display: 'flex' }}>
                <CircularProgress fontSize="large" />
              </Box>
            </div>
          </div> : <>
            {image &&
              <div className="chatTeacher__body">
                <img src={URL.createObjectURL(image)} className="chatTeacher__body" alt="" />
              </div>}
            {video &&
              <div className="chatTeacher__bodyVideo">
                <h5 className={'videoMessage'}>
                  <Player
                    playsInline
                    poster="/assets/poster.png"
                    src={URL.createObjectURL(video)}
                  />
                </h5>
                <h6 className="videoName">{video.name}</h6>
              </div>}
            <div className="doubtBox_footer">
              <div className="send_Message_box">
                <input placeholder={'Caption'} value={caption} type="text" onChange={e => setCaption(e.target.value)} />
                <div className="iconsTeacher">
                  <SendIcon className="icon" onClick={sendDoc} />
                </div>
              </div>
            </div>
          </>}
        </>
          :
          <>
            <div className="chatTeacher__body">
            <Index />
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
            </div>
            {/* <form> */}
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
                        <ImageRoundedIcon className="chatIcon" />
                      </label>
                      <input type="file" id={'image'} style={{ display: 'none' }} onChange={selectImage} accept="image/git , image/jpeg , image/png" />
                    </div>
                    <div className="show_typeVideo">
                      <label htmlFor="video">
                        <VideoLibraryRoundedIcon className="chatIcon" /></label>
                      <input type="file" id={'video'} style={{ display: 'none' }} onChange={selectVideo} />
                    </div>
                    <div className="show_typeDocument" >
                      <label htmlFor="doc">
                        <InsertDriveFileRoundedIcon />
                      </label>
                      <input type="file" id={'doc'} style={{ display: 'none' }} onChange={e => {
                        setDoc(e.target.value)
                      }} accept="image/pdf , image/html , image/js" />
                    </div>
                  </div>}
                  <AttachFileIcon
                    className="icon"
                    onClick={() => {
                      setShowTypeFile(!showTypeFile);
                    }}
                  />
                  <SendIcon className="icon" onClick={sendMessage} />
                </div>
              </div>
            </div>
            {/* </form> */}
          </>}
      </div>
    </>
  );
}

export default ChatTeacher;
