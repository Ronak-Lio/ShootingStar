import Chatmsg from "./Chatmsg";
import "../Teacher/ChatTeacher/ChatTeacher.css";
import firebase from 'firebase';
import React, { useState, useEffect } from "react"; 
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { v4 as uuid } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Player } from 'video-react';
import { useStateValue } from "../../../StateProvider";
import db from "../../../firebase";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

function Chat() {
  const [
    {
      signInAs,
      user,
    },
  ] = useStateValue();

  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [popupshowImage, setPopupshowImage] = useState(false);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
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
    if (signInAs.currentCourseID && signInAs?.currentSubjectID && input) {
      db.collection("Courses")
        .doc(signInAs.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
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
    if (signInAs?.currentSubjectID && signInAs.currentCourseID) {
      db.collection("Courses")
        .doc(signInAs.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
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
  }, [signInAs?.currentSubjectID]);

  //  select image
  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPopupshowImage(!popupshowImage);
      setShowTypeFile(!showTypeFile)
    }
  }

  // select video 
  const selectVideo = (e) => {
    setLoading(true);
    e.preventDefault();
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
      setPopupshowImage(true);
    }
    setLoading(false);
    setShowTypeFile(!showTypeFile)
  }

  const sendDoc = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (video) {
      const ID = uuid();
      const imagesRef = firebase.storage().ref('chatVideo').child(ID);
      await imagesRef.put(video);
      imagesRef.getDownloadURL().then((URL) => {
        if (signInAs?.currentCourseID && signInAs?.currentSubjectID && video) {
          db.collection("Courses")
            .doc(signInAs?.currentCourseID)
            .collection("Subjects")
            .doc(signInAs?.currentSubjectID)
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
              setShowTypeFile(false);
            });
        } else {
          alert('Something went wrong ! Try again ')
        }
      })
    }
    if (image) {
      const id = uuid();
      const imagesRef = firebase.storage().ref('chatImages').child(id);
      await imagesRef.put(image);
      imagesRef.getDownloadURL().then((url) => {
        if (signInAs?.currentCourseID && signInAs?.currentSubjectID){
          db.collection("Courses")
            .doc(signInAs?.currentCourseID)
            .collection("Subjects")
            .doc(signInAs?.currentSubjectID)
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
              {signInAs?.currentSubject}
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
              <div className="chatTeacher__body_Video">
                <div className="videoCancelUpload" onClick={() => {
                  setVideo(null);
                  setPopupshowImage(false);
                }}>
                  <ClearRoundedIcon />
                </div>
                <div className="videoMessageOut">
                  
                  <img src={URL.createObjectURL(image)} alt="" className='videoMessage'/>
                  <h6 className="videoName">{image.name}</h6>
                </div>
              </div>}
            {video &&
              <div className="chatTeacher__body">
                <div className="videoCancelUpload" onClick={() => {
                  setVideo(null);
                  setPopupshowImage(false);
                }}>
                  <ClearRoundedIcon />
                </div>
                <div className="videoMessageOut">
                  <div className='videoMessage'>
                    <Player
                      playsInline
                      poster="/assets/poster.png"
                      src={URL.createObjectURL(video)}
                    />
                  </div>
                <h6 className="videoName">{video.name}</h6>
                </div>
              </div>}
              <div className="doubtBox_footerForCaption">
              <div className="send_Message_box_ForCaption">
                <input placeholder={'Caption'} value={caption} type="text" onChange={e => setCaption(e.target.value)} />
                <div className="sendCaption">
                  <SendIcon className="icon" onClick={sendDoc} />
                </div>
              </div>
            </div>
          </>}
        </>
          :
          <>
            <div className="chatTeacher__body">
              {messages.map((message) => (
                <div
                  className={
                    message.data?.name === user?.email
                      ? "chatTeacher__msgBox"
                      : "chatTeacher__msgBoxNot"
                  }
                >
                  <Chatmsg message={message} />
                </div>
              ))}
            </div>
            <div className="doubtBox_footerForChat">
              <div className="send_Message_box">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                  <div className="iconsTeacher">
                <div className="iconDiv">
                    <div className="showtypeFile">
                      <div className="show_typeImage">
                        <label htmlFor="image">
                          <ImageRoundedIcon />
                        </label>
                        <input type="file" id={'image'} style={{ display: 'none' }} onChange={selectImage} accept="image/git , image/jpeg , image/png" />
                      </div>
                      <div className="show_typeVideo">
                        <label htmlFor="video">
                          <VideoLibraryRoundedIcon />
                        </label>
                        <input type="file" id={'video'} style={{ display: 'none' }} onChange={selectVideo} />
                      </div>
                      <div className="show_typeDocument" >
                        <label htmlFor="doc">
                          <InsertDriveFileRoundedIcon/>
                        </label>
                        <input type="file" id={'doc'} style={{ display: 'none' }} accept="image/pdf , image/html , image/js" />
                      </div>
                    </div>
                    <div>
                    <SendIcon className="icon" onClick={sendMessage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
      </div>
    </>
  );
}

export default Chat;
