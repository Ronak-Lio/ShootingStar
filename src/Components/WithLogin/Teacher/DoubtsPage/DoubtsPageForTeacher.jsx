import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../../../StateProvider";
import { actionTypes } from "../../../../reducer";
import "./DoubtsPageForTeacher.css";
import StudentName from "./StudentName";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Doubt from "../../DoubtsPage/Doubt";
import DoubtReplies from "../../DoubtsPage/DoubtReplies";
import db from "../../../../firebase";
import firebase from "firebase";
import HeaderTeacher from "../HeaderTeacher/HeaderTeacher";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import UploadPdf from "./UploadPdf";
import { v4 as uuid } from "uuid";
import { Player } from "video-react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { storage } from "../../../../firebase";
import Button from '@mui/material/Button';

function DoubtsPageForTeacher() {
  const [
    {
      openDoubtReplies,
      user,
      signInAs,
      chatName,
      sendPdf,
    },
    dispatch,
  ] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [popupshowImage, setPopupshowImage] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [doc, setDoc] = useState([]);
  const [showTypeFile, setShowTypeFile] = useState(false);
  const [finalMessages, setFinalMessages] = useState([]);
  const [z, setZ] = useState();
  const [limit, setLimit] = useState(20);
  const [length, setLength] = useState();
  const[roomId , setRoomId] = useState();

  var today = new Date();
  var datetime = today.toLocaleString();

  useEffect(() => {
    if (user && signInAs?.currentCourseID && signInAs?.currentSubjectID) {
      console.log(signInAs?.currentCourseID);

      setInput("");

      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .collection("doubtRooms")
        .onSnapshot((snapshot) =>
          setRooms(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          )
        );
    }
  }, [
    user,
    signInAs?.currentCourseID,
    signInAs?.currentSubjectID,
    messages.length,
  ]);

  useEffect(() => {
    if (user && signInAs?.currentCourseID && signInAs?.currentSubjectID && chatName) {
      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .collection("doubtRooms")
        .where("name", "==", chatName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setRoomId(doc.id)

            db.collection("Courses")
              .doc(signInAs?.currentCourseID)
              .collection("Subjects")
              .doc(signInAs?.currentSubjectID)
              .collection("doubtRooms")
              .doc(doc.id)
              .onSnapshot((snapshot) => {
                console.log( "Data is " , snapshot.data())
                setZ(snapshot.data().messagesLength + 1);
                setLength(snapshot.data().messagesLength);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  } , [signInAs , user , chatName]);
 

  useEffect(() => {
    if (user && signInAs?.currentCourseID && signInAs?.currentSubjectID && chatName) {
      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .collection("doubtRooms")
        .where("name", "==", chatName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            db.collection("Courses")
              .doc(signInAs?.currentCourseID)
              .collection("Subjects")
              .doc(signInAs?.currentSubjectID)
              .collection("doubtRooms")
              .doc(doc.id)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .limit(20)
              .onSnapshot((snapshot) =>
                setMessages(
                  snapshot.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                  }))
                )
              );
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [chatName, sendPdf , signInAs?.currentSubject , signInAs?.currentCourse]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: false,
    });
  }, [chatName]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_CHATNAME,
      chatName: rooms[0]?.data?.name,
    });
  }, [rooms.length]);

  useEffect(() => {}, [chatName]);

  const selectImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPopupshowImage(!popupshowImage);
      setShowTypeFile(!showTypeFile);
    }
  };

  const selectVideo = (e) => {
    setLoading(true);
    e.preventDefault();
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
      setPopupshowImage(true);
    }
    setLoading(false);
  };

  const sendMessage = (e) => {
    e.preventDefault();
      console.log(signInAs);
      console.log(input);
      if (chatName) {
        if (image) {
          if(image.size < 1000*1024){
            setLoading(true);
            const id = uuid();
            const upload = storage.ref(`doubtImages/${id}`).put(image);
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
                const url = await upload.snapshot.ref.getDownloadURL();
                if (url) {
                  db.collection("students")
                    .where("name", "==", chatName)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
  
                        db.collection("students").doc(doc.id).collection("notifications").add({
                          message2 : `Mesage from ${signInAs?.name}`,
                          timestamp:
                          firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        console.log(signInAs);
                        db.collection("students")
                          .doc(doc.id)
                          .collection("courses")
                          .where("name", "==", signInAs?.currentCourse)
                          .get()
                          .then((querySnapshot) => {
                            querySnapshot.forEach((doc1) => {
                              // doc.data() is never undefined for query doc snapshots
                              console.log(doc1.id, " => ", doc1.data());
                              db.collection("students")
                                .doc(doc.id)
                                .collection("courses")
                                .doc(doc1.id)
                                .collection("subjects")
                                .where("name", "==", signInAs?.currentSubject)
                                .get()
                                .then((querySnapshot) => {
                                  querySnapshot.forEach((doc2) => {
                                    // doc.data() is never undefined for query doc snapshots
                                    console.log(doc2.id, " => ", doc2.data());
                                    console.log(
                                      "REACHED",
                                      doc.id,
                                      doc1.id,
                                      doc2.id
                                    );
  
                                    db.collection("students")
                                      .doc(doc.id)
                                      .collection("courses")
                                      .doc(doc1.id)
                                      .collection("subjects")
                                      .doc(doc2.id)
                                      .update({
                                        doubtMessageslength: z,
                                      });
  
                                    db.collection("students")
                                      .doc(doc.id)
                                      .collection("courses")
                                      .doc(doc1.id)
                                      .collection("subjects")
                                      .doc(doc2.id)
                                      .collection("messagesToTeacher")
                                      .add({
                                        name: signInAs?.name,
                                        message: input,
                                        type: "image",
                                        timestamp:
                                          firebase.firestore.FieldValue.serverTimestamp(),
                                        imageName: id,
                                        imageOriginalName: image.name,
                                        imageURL: url,
                                      });
                                  });
                                });
                            });
                          });
                      });
                    })
                    .catch((error) => {
                      console.log("Error getting documents: ", error);
                    });
                  db.collection("Courses")
                    .doc(signInAs?.currentCourseID)
                    .collection("Subjects")
                    .doc(signInAs?.currentSubjectID)
                    .collection("doubtRooms")
                    .where("name", "==", chatName)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
  
                        let y = doc.data().messagesLength;
                        y++;
  
                        db.collection("Courses")
                          .doc(signInAs?.currentCourseID)
                          .collection("Subjects")
                          .doc(signInAs?.currentSubjectID)
                          .collection("doubtRooms")
                          .doc(doc.id)
                          .update({
                            messagesLength: y,
                          });
  
                        db.collection("Courses")
                          .doc(signInAs?.currentCourseID)
                          .collection("Subjects")
                          .doc(signInAs?.currentSubjectID)
                          .collection("doubtRooms")
                          .doc(doc.id)
                          .collection("messages")
                          .add({
                            name: signInAs?.name,
                            message: input,
                            type: "image",
                            timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                            imageName: id,
                            imageOriginalName: image.name,
                            imageURL: url,
                          });
                      });
                    })
                    .catch((error) => {
                      console.log("Error getting documents: ", error);
                    });
                  setLoading(false);
                  setPopupshowImage(false);
                  setImage(null);
                }
              }
            );
          }else{
            alert("Please select a file below 1 MB")
          }
        } else if (video) {
          setLoading(true);
          const id = uuid();
          const upload = storage.ref(`doubtVideos/${id}`).put(video);
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
              const url = await upload.snapshot.ref.getDownloadURL();
              if (url) {
                db.collection("students")
                  .where("name", "==", chatName)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      console.log(signInAs);

                      db.collection("students").doc(doc.id).collection("notifications").add({
                        message2 : `Message from ${signInAs?.name}`,
                        timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                      })

                      
                      db.collection("students")
                        .doc(doc.id)
                        .collection("courses")
                        .where("name", "==", signInAs?.currentCourse)
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((doc1) => {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc1.id, " => ", doc1.data());
                            db.collection("students")
                              .doc(doc.id)
                              .collection("courses")
                              .doc(doc1.id)
                              .collection("subjects")
                              .where("name", "==", signInAs?.currentSubject)
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach((doc2) => {
                                  // doc.data() is never undefined for query doc snapshots
                                  console.log(doc2.id, " => ", doc2.data());
                                  console.log(
                                    "REACHED",
                                    doc.id,
                                    doc1.id,
                                    doc2.id
                                  );

                                  db.collection("students")
                                    .doc(doc.id)
                                    .collection("courses")
                                    .doc(doc1.id)
                                    .collection("subjects")
                                    .doc(doc2.id)
                                    .update({
                                      doubtMessageslength: z,
                                    });

                                  db.collection("students")
                                    .doc(doc.id)
                                    .collection("courses")
                                    .doc(doc1.id)
                                    .collection("subjects")
                                    .doc(doc2.id)
                                    .collection("messagesToTeacher")
                                    .add({
                                      name: signInAs?.name,
                                      videoURL: url,
                                      message: input,
                                      timestamp:
                                        firebase.firestore.FieldValue.serverTimestamp(),
                                      videoName: id,
                                      videoOriginalName: video.name,
                                      type: "video",
                                      date: datetime,
                                    });
                                });
                              });
                          });
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
                db.collection("Courses")
                  .doc(signInAs?.currentCourseID)
                  .collection("Subjects")
                  .doc(signInAs?.currentSubjectID)
                  .collection("doubtRooms")
                  .where("name", "==", chatName)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());

                      let y = doc.data().messagesLength;
                      y++;

                      db.collection("Courses")
                        .doc(signInAs?.currentCourseID)
                        .collection("Subjects")
                        .doc(signInAs?.currentSubjectID)
                        .collection("doubtRooms")
                        .doc(doc.id)
                        .update({
                          messagesLength: y,
                        });

                      db.collection("Courses")
                        .doc(signInAs?.currentCourseID)
                        .collection("Subjects")
                        .doc(signInAs?.currentSubjectID)
                        .collection("doubtRooms")
                        .doc(doc.id)
                        .collection("messages")
                        .add({
                          name: signInAs?.name,
                          videoURL: url,
                          message: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          videoName: id,
                          videoOriginalName: video.name,
                          type: "video",
                          date: datetime,
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
                setLoading(false);
                setPopupshowImage(false);
                setVideo(null);
              }
            }
          );
        } else  {
          if(input !== null){

          db.collection("students")
            .where("name", "==", chatName)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                console.log(signInAs);
                db.collection("students")
                  .doc(doc.id)
                  .collection("courses")
                  .where("name", "==", signInAs?.currentCourse)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc1) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc1.id, " => ", doc1.data());

                      db.collection("students").doc(doc.id).collection("notifications").add({
                        message1 : input,
                        message2 : `Message from ${signInAs?.name}`,
                        timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                      })


                      db.collection("students")
                        .doc(doc.id)
                        .collection("courses")
                        .doc(doc1.id)
                        .collection("subjects")
                        .where("name", "==", signInAs?.currentSubject)
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((doc2) => {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc2.id, " => ", doc2.data());
                            console.log("REACHED", doc.id, doc1.id, doc2.id);

                            db.collection("students")
                              .doc(doc.id)
                              .collection("courses")
                              .doc(doc1.id)
                              .collection("subjects")
                              .doc(doc2.id)
                              .update({
                                doubtMessageslength: z,
                              });

                            db.collection("students")
                              .doc(doc.id)
                              .collection("courses")
                              .doc(doc1.id)
                              .collection("subjects")
                              .doc(doc2.id)
                              .collection("messagesToTeacher")
                              .add({
                                name: signInAs?.name,
                                message: input,
                                type: "text",
                                timestamp:
                                  firebase.firestore.FieldValue.serverTimestamp(),
                              });
                          });
                        });
                    });
                  });
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
          db.collection("Courses")
            .doc(signInAs?.currentCourseID)
            .collection("Subjects")
            .doc(signInAs?.currentSubjectID)
            .collection("doubtRooms")
            .where("name", "==", chatName)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                db.collection("Courses")
                  .doc(signInAs?.currentCourseID)
                  .collection("Subjects")
                  .doc(signInAs?.currentSubjectID)
                  .collection("doubtRooms")
                  .doc(doc.id)
                  .collection("messages")
                  .add({
                    name: signInAs?.name,
                    message: input,
                    type: "text",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  });

                let y = doc.data().messagesLength;
                y++;

                db.collection("Courses")
                  .doc(signInAs?.currentCourseID)
                  .collection("Subjects")
                  .doc(signInAs?.currentSubjectID)
                  .collection("doubtRooms")
                  .doc(doc.id)
                  .update({
                    messagesLength: y,
                  });
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });

          setInput("");
        }
      }
      }
    
  };

  const open_send_Pdf_box = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: true,
    });
  };

  const seeMoreMessages = (e) => {
    e.preventDefault();
    console.log(length)
    if (user && signInAs?.currentCourseID && signInAs?.currentSubjectID && chatName) {
      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .collection("doubtRooms")
        .where("name", "==", chatName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            db.collection("Courses")
              .doc(signInAs?.currentCourseID)
              .collection("Subjects")
              .doc(signInAs?.currentSubjectID)
              .collection("doubtRooms")
              .doc(doc.id)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .limit(limit+20)
              .onSnapshot((snapshot) =>
                setMessages(
                  snapshot.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                  }))
                )
              );
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }

    setLimit(limit+20);
    setLength(length-20);
  }



  return (
    <div className="doubtsPageforTeacher">
      <HeaderTeacher />
      <Container>
        <DoubtBox>
          <div className="student_names">
            <p className="names_heading">Students</p>
            <div className="names_div">
              {rooms.map((room) => (
                <StudentName name={room.data.name} />
              ))}
            </div>
          </div>
          <div className="doubt_section">
            <div className="doubt_section_header">
              <p>{chatName}</p>
            </div>
            {sendPdf === false ? (
              <div className="doubt_section_doubts_messages">
                {popupshowImage ? (
                  <>
                    {loading ? (
                      <div className="popupbodyImage_Loading">
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress fontSize="large" />
                        </Box>
                      </div>
                    ) : (
                      <>
                        {image && (
                          <div className="chatTeacher__body">
                            <img
                              src={URL.createObjectURL(image)}
                              className="chatTeacher__body"
                              alt=""
                            />
                          </div>
                        )}
                        {video && (
                          <div className="chatTeacher__bodyVideo">
                            <h5 className={"videoMessage"}>
                              <Player
                                playsInline
                                poster="/assets/poster.png"
                                src={URL.createObjectURL(video)}
                              />
                            </h5>
                            <h6 className="videoName">{video.name}</h6>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {messages.map((message) => (
                      <Doubt message={message} roomId = {roomId}/>
                    ))}
                    {length > 20 && (
                      <Button className="see_more" onClick = {seeMoreMessages}>See More</Button>
                    )}
                  </>
                )}
              </div>
            ) : (
              <UploadPdf />
            )}
            {sendPdf === false && (
              <div className="doubtBox_footer">
                <div className="send_Message_box">
                  <input
                    type="text"
                    placeholder="Type a message "
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className="doutBox_footer_icons">
                    {popupshowImage === false && loading === false && (
                      <div>
                        <label htmlFor="image">
                          <ImageIcon className="footer_icon" />
                        </label>
                        <input
                          type="file"
                          id={"image"}
                          style={{ display: "none" }}
                          onChange={selectImage}
                          accept="image/git , image/jpeg , image/png"
                        />
                        <label htmlFor="video">
                          <VideocamIcon className="footer_icon" />
                        </label>
                        <input
                          type="file"
                          id={"video"}
                          style={{ display: "none" }}
                          onChange={selectVideo}
                        />
                        <InsertDriveFileRoundedIcon
                          className="footer_icon"
                          onClick={open_send_Pdf_box}
                        />
                      </div>
                    )}
                    <div className="send_div">
                      <SendIcon
                        className="footer_icon footer_send_icon"
                        onClick={sendMessage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DoubtBox>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 50px;
  padding-top: 20px;
  justify-content: space-around;
  height: 88vh;

  @media (max-width: 600px) {
    padding: 10px;
    padding-bottom: 15px;
  }
`;

const DoubtBox = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid lightgray;
  height: 100%;
  height: fixed;

  .student_names {
    flex: 0.3;
    border-right: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
      flex: 1;
    }
  }

  .doubtBox_footer {
    background-color: #fff;
    width: 100%;
    height: 65px;
    padding: 5px;
    display: flex;
    flex-direction: row;
  }

  .doutBox_footer_icons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-left: 8px;
  }

  .footer_icon {
    font-size: 15px;
    margin-right: 3px;

    &:hover {
      cursor: pointer;
      color: #6d6969;
    }
  }

  .footer_send_icon {
    font-size: 18px;
  }

  .send_Message_box {
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    padding: 5px;
    input {
      border: 0;
      outline-width: 0px;
      width: 100%;
      padding: 5px;
      height: 50%;
    }
  }

  .send_div {
    display: flex;
    width: 80%;
    justify-content: flex-end;
    margin-left: auto;
  }

  .send_icon {
    margin-left: 10px;
  }

  .icons {
    display: flex;
    justify-content: flex-end;
    margin-left: 5px;
  }

  .icon {
    font-size: 18px;
    &:hover {
      cursor: pointer;
      color: #6d6969;
    }
  }

  .names_heading {
    padding-left: 20px;
    padding-top: 5px;
    font-size: 20px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 5px;
    margin-bottom: 0px;
  }

  .doubt_section {
    flex: 0.7;
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
      display: none;
    }
  }

  .doubt_section_header {
    p {
      padding-left: 20px;
      font-size: 20px;
      border-bottom: 1px solid lightgray;
      padding-bottom: 5px;
      margin-bottom: 0px;
      padding-top: 5px;
    }
  }

  .see_more {
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 10px;
    &:hover {
      background-color: lightgray;
    }
  }

  .doubt_section_doubts_messages {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    background-color: #5094ee;
  }
`;

export default DoubtsPageForTeacher;
