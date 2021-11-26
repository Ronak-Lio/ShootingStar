import Chatmsg from "./Chatmsg";
import styled from "styled-components";
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
import db, { storage } from "../../../firebase";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { actionTypes } from "../../../reducer";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import Button from '@mui/material/Button';

function Chat() {
  const [
    {
      signInAs,
      user,
    }, dispatch
  ] = useStateValue();

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [caption, setCaption] = useState('');
  const [popupshowImage, setPopupshowImage] = useState(false);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showTypeFile, setShowTypeFile] = useState(false);
  const history = useHistory();

  

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  // const [fileUrl, setFileUrl] = useState();

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];

  const defaultLayoutPluginInstance = defaultLayoutPlugin();


  const [rooms, setRooms] = useState([]);
  const [iD, setID] = useState(false);

  // msg  loading
  const [r, setR] = useState(0);
  const [z, setZ] = useState();
  const [limit, setLimit] = useState(20);
  const [length, setLength] = useState();

  useEffect(() => {
    if (signInAs?.currentSubjectID) {
      db.collection("Courses")
        .doc(signInAs.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .onSnapshot((snapshot) => {
          snapshot.data() && setLength(snapshot.data().chatMessagesLength)
        }
        );
    }
  }, [signInAs?.currentSubjectID])
  console.log("ppppp", length);

  const seeMoreMessages = (e) => {
    e.preventDefault();
    console.log(length)
    db.collection("Courses")
      .doc(signInAs.currentCourseID)
      .collection("Subjects")
      .doc(signInAs?.currentSubjectID)
      .collection("chat")
      .orderBy("timestamp", "desc")
      .limit(limit + 20)
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    setLimit(limit + 20);
    setLength(length - 20);
  }

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        if(selectedFile.size < 1000*1024){
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setPdfFile(e.target.result);
            setFileName(selectedFile.name);
            setFile(selectedFile);
            setPdfFileError("");
          };
        }else{
          setPdfFileError("Please select a file of size below 1MB");
        }
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  const close_send_pdf = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: false,
    });
    setID(false)
    setPopupshowImage(false)
    setPdfFile(null);
    setFileName('');
    setFile();
    setPdfFileError("");
    setViewPdf(null)
  };

  const back_to_previous_page = () => {
    history.goBack();
  };

  const send_assignment = async (e) => {
    e.preventDefault();
    if (viewPdf) {
      const IDFORPDF = uuid();
      const upload = storage.ref(`Chat/${IDFORPDF}`).put(file);
      setLoading1(true);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          setLoading1(false);
          if (downloadURL && fileName) {
            db.collection("Courses")
              .doc(signInAs?.currentCourseID)
              .collection("Subjects")
              .doc(signInAs?.currentSubjectID)
              .collection("chat")
              .add({
                sendby: signInAs?.name,
                fileName: fileName,
                fileUrl: downloadURL,
                type: "pdf",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                pdfName: IDFORPDF,
                date: datetime,
                // id:
              });
            setID(false);
            setPopupshowImage(false);
          }
        }
      )
    } else {
      alert('Select Image First')
    }
  }
  // scorll work going here

  // date
  var today = new Date();
  var datetime = today.toLocaleString();

  // send message 
  const sendMessage = (e) => {
    e.preventDefault();
    if (signInAs.currentCourseID && signInAs?.currentSubjectID && input) {
      if (messages.length == 0) {
        db.collection("Courses")
          .doc(signInAs.currentCourseID)
          .collection("Subjects")
          .doc(signInAs?.currentSubjectID)
          .update({
            chatMessagesLength: 0,
          })
      } else {
        db.collection("Courses")
          .doc(signInAs.currentCourseID)
          .collection("Subjects")
          .doc(signInAs?.currentSubjectID)
          .update({
            chatMessagesLength: messages.length + 1,
          })
      }
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
        .orderBy("timestamp", "desc")
        .limit(20 + r)
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
        if (signInAs?.currentCourseID && signInAs?.currentSubjectID) {
          if(image.size < 1000*1024){
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
          }else{
            alert("Please select a file below 1 MB")
          }
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

                  <img src={URL.createObjectURL(image)} alt="" className='videoMessage' />
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
            {!iD && <div className="doubtBox_footerForCaption">
              <div className="send_Message_box_ForCaption">
                <input placeholder={'Caption'} value={caption} type="text" onChange={e => setCaption(e.target.value)} />
                <div className="sendCaption">
                  <SendIcon className="icon" onClick={sendDoc} />
                </div>
              </div>
            </div>}
          </>}
          {iD &&
            <Container>
              {loading1 === false ? (
                <>
                  <div className="submit_assignment_page_header">
                    <ArrowBackIcon
                      onClick={back_to_previous_page}
                      className="arrow_back_icon"
                      onClick={close_send_pdf}
                    />
                  </div>
                  <div className="upload_pdf">
                    <input
                      type="file"
                      name="file"
                      onChange={handlePdfFileChange}
                      required
                    />
                    {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
                    {!viewPdf ? <button type="submit" className="" onClick={handlePdfFileSubmit}>
                      Select
                    </button> : <div className="submit_button_div">
                      <button onClick={send_assignment}>Send</button>
                    </div>}
                  </div>
                  <p className="view_pdf">View Pdf</p>
                  <div className="pdf-container">
                    {/* show pdf conditionally (if we have one)  */}
                    {viewPdf && (
                      <>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                          <Viewer
                            fileUrl={viewPdf}
                            plugins={[defaultLayoutPluginInstance]}
                          />
                        </Worker>
                      </>
                    )}

                    {/* if we dont have pdf or viewPdf state is null */}
                    {!viewPdf && <>No pdf file selected</>}
                  </div>
                </>
              ) : (
                // <Loading />
                <div className={"PdfLoading"}>Loading</div>
              )}
            </Container>}
        </>

          :
          <>
            <div className="chatTeacher__body">
              {messages.map((message) => (
                <div
                  className={
                    message.data?.sendby === signInAs?.name
                      ? "chatTeacher__msgBox"
                      : "chatTeacher__msgBoxNot"
                  }
                >
                  <Chatmsg message={message} />
                </div>
              )
              )}
              {length > 20 && (
                // <button className="see_more" onClick = {seeMoreMessages}>See More</button>

                <Button onClick={seeMoreMessages} variant="contained" disableElevation>
                  See More
                </Button>
              )}
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
                        <label>
                          <InsertDriveFileRoundedIcon onClick={() => {
                            setID(true)
                            setPopupshowImage(true);
                          }} />
                        </label>
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

const Container = styled.div`
  width: 100%;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  height: 100%;
  .submit_assignment_page_header {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-top: 10px;
    p {
      width: 100%;
      text-align: center;
      margin-bottom: 0px;
      font-size: 18px;
    }
  }
  .arrow_back_icon {
    font-size: 18px;
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }
  .upload_pdf {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    width: 92%;
    margin-left: auto;
    margin-right: auto;
    button {
      width: 80px;
      border-radius: 20px;
      background-color: white;
      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }
  .view_pdf {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    font-size: 17px;
  }
  .pdf-container {
    width: 90%;
    height: 100%;
    background-color: #e4e4e4;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }
  .error-msg {
    width: 100%;
    color: red;
    font-size: 14px;
    font-weight: 600;
  }
  .marks {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    p {
      margin-bottom: 5px;
    }
  }
  .submit_button_div {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: flex-end;
    button {
      width: 80px;
      border-radius: 20px;
      background-color: #1183e0;
      color: white;
      &:hover {
        cursor: pointer;
        background-color: #63b3f5;
      }
    }
  }
  @media (max-width: 420px) {
    .upload_pdf {
      display: flex;
      flex-direction: column;
      button {
        margin-top: 10px;
        width: 100%;
        border-radius: 10px;
      }
    }
  }
`;