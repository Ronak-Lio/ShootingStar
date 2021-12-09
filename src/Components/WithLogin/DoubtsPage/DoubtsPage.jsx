import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./DoubtsPage.css";
import Doubt from "./Doubt";
import SendIcon from "@mui/icons-material/Send";
import { useStateValue } from "../../../StateProvider";
import Notices from "../Notices/Notices";
import { useHistory } from "react-router-dom";
import { actionTypes } from "../../../reducer";
import NoticePopup from "../Notices/NoticePopup";
import AskDoubtPopup from "./AskDoubtPopup";
import HeaderMain from "../Header/HeaderMain";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import db from "../../../firebase";
import firebase from "firebase";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import UploadPdf from "./UploadPdf";
import { v4 as uuid } from "uuid";
import Loading from "../../WithLogin/Loading/Loading";
import { Player } from "video-react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { storage } from "../../../firebase";
import Button from '@mui/material/Button';

function DoubtsPage() {
  const [{ openDoubtReplies, user, signInAs, sendPdf }, dispatch] =
    useStateValue();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
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
  const [teacher, setTeacher] = useState();

  var today = new Date();
  var datetime = today.toLocaleString();

  useEffect(() => {
    if (
      user &&
      signInAs?.usercurrentCourseID &&
      signInAs?.usercurrentSubjectID &&
      signInAs?.currentCourseID &&
      signInAs?.currentSubjectID
    ) {
      db.collection("students")
        .doc(user?.uid)
        .collection("courses")
        .doc(signInAs?.usercurrentCourseID)
        .collection("subjects")
        .doc(signInAs?.usercurrentSubjectID)
        .onSnapshot((snapshot) => {
          setLength(snapshot.data().doubtMessageslength);
        });

      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .onSnapshot((snapshot) => {
          setTeacher(snapshot.data().teacher);
        });
    }
  }, [user, signInAs?.usercurrentCourseID, signInAs?.usercurrentSubjectID]);

  useEffect(() => {
    if (
      user &&
      signInAs?.usercurrentCourseID &&
      signInAs?.usercurrentSubjectID &&
      signInAs?.currentCourseID &&
      signInAs?.currentSubjectID
    ) {
      db.collection("students")
        .doc(user?.uid)
        .collection("courses")
        .doc(signInAs?.usercurrentCourseID)
        .collection("subjects")
        .doc(signInAs?.usercurrentSubjectID)
        .onSnapshot((snapshot) => {
          setZ(snapshot.data().doubtMessageslength + 1);
        });

      db.collection("students")
        .doc(user?.uid)
        .collection("courses")
        .doc(signInAs?.usercurrentCourseID)
        .collection("subjects")
        .doc(signInAs?.usercurrentSubjectID)
        .collection("messagesToTeacher")
        .orderBy("timestamp", "desc")
        .limit(20)
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );

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

    console.log(messages);
  }, [
    user,
    signInAs?.usercurrentCourseID,
    signInAs?.usercurrentSubjectID,
    signInAs?.currentCourseID,
    signInAs?.currentSubjectID,
  ]);

  useEffect(() => {
    console.log("Length is", z);
  }, [length, z, teacher]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: false,
    });
  }, []);

  useEffect(() => {
    setInput("");
  }, [image, video]);

  useEffect(() => {}, [finalMessages.length]);

  const goToNoticesPage = (e) => {
    e.preventDefault();
    history.push("/NoticesPage");
  };

  const open_noticesPopup = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.OPEN_NOTICES_POPUP,
      openNoticesPopup: true,
    });
  };

  const open_ask_doubt_popup = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.OPEN_ASKDOUBT_POPUP,
      openAskDoubtPopup: true,
    });
  };

  const back_to_previous_page = () => {
    history.goBack();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(signInAs);
    console.log(input);
    if (
      signInAs.name &&
      signInAs?.usercurrentCourseID &&
      signInAs?.usercurrentSubjectID
    ) {
      console.log("User Course Id is", signInAs?.usercurrentCourseID);
      console.log("User Subject Id is", signInAs?.usercurrentSubjectID);
      if (image) {
        if(image.size < 1000*1024){
          setLoading(true);
          const id = uuid();
          const upload = storage.ref(`doubtImages/${id}`).put(image);
  
          console.log("Image size is " , image.size)
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
                db.collection("notificationsForTeachers")
                  .where("name", "==", teacher)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
  
                      db.collection("notificationsForTeachers")
                        .doc(doc.id)
                        .collection("notifications")
                        .add({
                          message2: `Message from ${signInAs?.name}`,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
  
                db.collection("students")
                  .doc(user?.uid)
                  .collection("courses")
                  .doc(signInAs?.usercurrentCourseID)
                  .collection("subjects")
                  .doc(signInAs?.usercurrentSubjectID)
                  .collection("messagesToTeacher")
                  .add({
                    name: signInAs?.name,
                    imageURL: url,
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    imageName: id,
                    imageOriginalName: image.name,
                    type: "image",
                  });
                let x = 0;
                for (let i = 0; i < rooms.length; i++) {
                  if (rooms[i].data.name === signInAs.name) {
                    x = 1;
                  }
                }
                if (x === 0) {
                  db.collection("students")
                    .doc(user?.uid)
                    .collection("courses")
                    .doc(signInAs?.usercurrentCourseID)
                    .collection("subjects")
                    .doc(signInAs?.usercurrentSubjectID)
                    .update({
                      doubtMessageslength: 0,
                    });
  
                  db.collection("Courses")
                    .doc(signInAs?.currentCourseID)
                    .collection("Subjects")
                    .doc(signInAs?.currentSubjectID)
                    .collection("doubtRooms")
                    .add({
                      name: signInAs.name,
                      messagesLength: 1,
                    })
                    .then(() => {
                      db.collection("Courses")
                        .doc(signInAs?.currentCourseID)
                        .collection("Subjects")
                        .doc(signInAs?.currentSubjectID)
                        .collection("doubtRooms")
                        .where("name", "==", signInAs.name)
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
                                imageURL: url,
                                message: input,
                                timestamp:
                                  firebase.firestore.FieldValue.serverTimestamp(),
                                imageName: id,
                                imageOriginalName: image.name,
                                type: "image",
                              });
                          });
                        })
                        .catch((error) => {
                          console.log("Error getting documents: ", error);
                        });
                    });
                } else {
                  db.collection("students")
                    .doc(user?.uid)
                    .collection("courses")
                    .doc(signInAs?.usercurrentCourseID)
                    .collection("subjects")
                    .doc(signInAs?.usercurrentSubjectID)
                    .update({
                      doubtMessageslength: z,
                    });
                  db.collection("Courses")
                    .doc(signInAs?.currentCourseID)
                    .collection("Subjects")
                    .doc(signInAs?.currentSubjectID)
                    .collection("doubtRooms")
                    .where("name", "==", signInAs.name)
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
                            imageURL: url,
                            message: input,
                            timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                            imageName: id,
                            imageOriginalName: image.name,
                            type: "image",
                          });
                      });
                    })
                    .catch((error) => {
                      console.log("Error getting documents: ", error);
                    });
                  setLoading(false);
                  setPopupshowImage(false);
                }
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

              db.collection("notificationsForTeachers")
              .where("name", "==", teacher)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());

                  db.collection("notificationsForTeachers")
                    .doc(doc.id)
                    .collection("notifications")
                    .add({
                      message2: `Message from ${signInAs?.name}`,
                      timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });



              db.collection("students")
                .doc(user?.uid)
                .collection("courses")
                .doc(signInAs?.usercurrentCourseID)
                .collection("subjects")
                .doc(signInAs?.usercurrentSubjectID)
                .collection("messagesToTeacher")
                .add({
                  name: signInAs?.name,
                  videoURL: url,
                  message: input,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  videoName: id,
                  videoOriginalName: video.name,
                  type: "video",
                  date: datetime,
                });
              let x = 0;
              for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].data.name === signInAs.name) {
                  x = 1;
                }
              }
              if (x === 0) {
                db.collection("students")
                  .doc(user?.uid)
                  .collection("courses")
                  .doc(signInAs?.usercurrentCourseID)
                  .collection("subjects")
                  .doc(signInAs?.usercurrentSubjectID)
                  .update({
                    doubtMessageslength: 1,
                  });
                db.collection("Courses")
                  .doc(signInAs?.currentCourseID)
                  .collection("Subjects")
                  .doc(signInAs?.currentSubjectID)
                  .collection("doubtRooms")
                  .add({
                    name: signInAs.name,
                    messagesLength: 1,
                  })
                  .then(() => {
                    db.collection("Courses")
                      .doc(signInAs?.currentCourseID)
                      .collection("Subjects")
                      .doc(signInAs?.currentSubjectID)
                      .collection("doubtRooms")
                      .where("name", "==", signInAs.name)
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
                  });
              } else {
                db.collection("students")
                  .doc(user?.uid)
                  .collection("courses")
                  .doc(signInAs?.usercurrentCourseID)
                  .collection("subjects")
                  .doc(signInAs?.usercurrentSubjectID)
                  .update({
                    doubtMessageslength: z,
                  });

                db.collection("Courses")
                  .doc(signInAs?.currentCourseID)
                  .collection("Subjects")
                  .doc(signInAs?.currentSubjectID)
                  .collection("doubtRooms")
                  .where("name", "==", signInAs.name)
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
              }
            }
          }
        );
      } else {

        db.collection("notificationsForTeachers")
        .where("name", "==", teacher)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            db.collection("notificationsForTeachers")
              .doc(doc.id)
              .collection("notifications")
              .add({
                message1 : input,
                message2: `Message from ${signInAs?.name}`,
                timestamp:
                  firebase.firestore.FieldValue.serverTimestamp(),
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });


        db.collection("students")
          .doc(user?.uid)
          .collection("courses")
          .doc(signInAs?.usercurrentCourseID)
          .collection("subjects")
          .doc(signInAs?.usercurrentSubjectID)
          .collection("messagesToTeacher")
          .add({
            name: signInAs.name,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            type: "text",
          });
        let x = 0;
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i].data.name === signInAs.name) {
            x = 1;
          }
        }
        if (x === 0) {
          db.collection("students")
            .doc(user?.uid)
            .collection("courses")
            .doc(signInAs?.usercurrentCourseID)
            .collection("subjects")
            .doc(signInAs?.usercurrentSubjectID)
            .update({
              doubtMessageslength: 0,
            });

          db.collection("Courses")
            .doc(signInAs?.currentCourseID)
            .collection("Subjects")
            .doc(signInAs?.currentSubjectID)
            .collection("doubtRooms")
            .add({
              name: signInAs.name,
              messagesLength: 1,
            })
            .then(() => {
              db.collection("Courses")
                .doc(signInAs?.currentCourseID)
                .collection("Subjects")
                .doc(signInAs?.currentSubjectID)
                .collection("doubtRooms")
                .where("name", "==", signInAs.name)
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
                        name: signInAs.name,
                        message: input,
                        timestamp:
                          firebase.firestore.FieldValue.serverTimestamp(),
                        type: "text",
                      });
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            });
        } else {
          db.collection("students")
            .doc(user?.uid)
            .collection("courses")
            .doc(signInAs?.usercurrentCourseID)
            .collection("subjects")
            .doc(signInAs?.usercurrentSubjectID)
            .update({
              doubtMessageslength: z,
            });
          db.collection("Courses")
            .doc(signInAs?.currentCourseID)
            .collection("Subjects")
            .doc(signInAs?.currentSubjectID)
            .collection("doubtRooms")
            .where("name", "==", signInAs.name)
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
                    name: signInAs.name,
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    type: "text",
                  });
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      }
      setInput("");
    }
  };

  const seeMoreMessages = (e) => {
    e.preventDefault();
    console.log(length);
    db.collection("students")
      .doc(user?.uid)
      .collection("courses")
      .doc(signInAs?.usercurrentCourseID)
      .collection("subjects")
      .doc(signInAs?.usercurrentSubjectID)
      .collection("messagesToTeacher")
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
  };

  const open_send_Pdf_box = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: true,
    });
  };

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

  return (
    <>
      <div className="dbPage_header">
        <HeaderMain />
      </div>
      <div className="doubtsPage">
        <div className="upcoming_class">
          {/* <p>Upcoming class at 14:33 on Monday</p> */}
          <div className="header_buttons">
          </div>
        </div>
        <Container>
          <DoubtBox>
            <div className="doubtBox_header">
              <div className="doubtBox_header_name">
                <ArrowBackIcon
                  className="arrowBack_icon"
                  onClick={back_to_previous_page}
                />
                <p>{signInAs?.currentSubject}</p>
              </div>
              {popupshowImage === false && loading === false && (
                <button
                  className="ask_doubt_button"
                  onClick={open_ask_doubt_popup}
                >
                  Ask a doubt
                </button>
              )}
            </div>
            {sendPdf === false ? (
              <div className="doubtBox_doubts">
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
                      <Doubt message={message} />
                    ))}
                    {length > 20 && (
                      <Button  onClick={seeMoreMessages}>
                        See More
                      </Button>
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
          </DoubtBox>
          <div className="notices">
            <Notices />
          </div>
        </Container>
        <NoticePopup />
        <AskDoubtPopup />
      </div>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 100%; */
  padding: 50px;
  padding-top: 20px;
  justify-content: space-around;
  height: 88vh;
  .notices {
    flex: 0.3;
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    /* margin-top : -50px; */
    flex-direction: column;
    width: fit-content;
    padding-top: 0px;
    button {
      height: 40px;
      border-radius: 10px;
      margin-left: 25px;
      background-color: white;
      &:hover {
        background-color: #80b3f5;
        color: white;
      }
    }
  }

  @media (max-width: 1024px) {
    .notices {
      display: none;
    }
  }

  @media (max-width: 500px) {
    padding: 0px;
    height: 100%;
  }
`;

const DoubtBox = styled.div`
  flex: 0.7;
  /* padding: 10px; */
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;

  .doubtBox_header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    /* background-color: darkgray; */
    p {
      text-align: center;
      margin-bottom: 0px;
      font-size: 17px;
      font-weight: 450;
      text-transform: uppercase;
    }
    border-bottom: 1px solid lightgray;
  }

  .arrowBack_icon {
    display: none;

    @media(max-width : 500px){
        display : flex;
    }
  }

  .doubtBox_doubts {
    /* background-color: #eeeded; */
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: #5094ee;
    /* padding-bottom : 10px; */
  }

  .doubtBox_footer {
    background-color: #fff;
    width: 100%;
    height: 65px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    @media (max-width: 500px){
    position: fixed;
    bottom: 0;
    }
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

  @media (max-width: 1024px) {
    flex: 1;
  }
`;

export default DoubtsPage;
