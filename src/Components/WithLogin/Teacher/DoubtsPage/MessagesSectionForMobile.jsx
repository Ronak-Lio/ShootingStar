import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import HeaderMain from "../../Header/HeaderMain";
import Doubt from "../../DoubtsPage/Doubt";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DoubtReplies from "../../DoubtsPage/DoubtReplies";
import { useStateValue } from "../../../../StateProvider";
import { actionTypes } from "../../../../reducer";
import db from "../../../../firebase";
import firebase from "firebase";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import UploadPdf from "./UploadPdf";
import { v4 as uuid } from "uuid";
import { Player } from "video-react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { storage } from "../../../../firebase";

function MessagesSectionForMobile() {
  const [
    {
      openDoubtReplies,
      user,
      signInAs,
      userCourseId,
      userSubjectId,
      chatName,
      sendPdf,
    },
    dispatch,
  ] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [popupshowImage, setPopupshowImage] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [doc, setDoc] = useState([]);
  const [showTypeFile, setShowTypeFile] = useState(false);
  const [z, setZ] = useState();
  const [limit, setLimit] = useState(20);
  const [length, setLength] = useState();

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
    userCourseId,
    userSubjectId,
    messages.length,
  ]);

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
    userCourseId,
    userSubjectId,
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

            db.collection("Courses")
              .doc(signInAs?.currentCourseID)
              .collection("Subjects")
              .doc(signInAs?.currentSubjectID)
              .collection("doubtRooms")
              .doc(doc.id)
              .collection("messages")
              .orderBy("timestamp", "asc")
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
  }, [chatName]);

  useEffect(() => {
    if (user && signInAs?.currentCourseID && signInAs?.currentSubjectID) {
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
              .onSnapshot((snapshot) => {
                setZ(snapshot.data().messagesLength + 1);
                setLength(snapshot.data().messagesLength);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [user, userCourseId, userSubjectId]);

  useEffect(() => {
    console.log("Length is", z);
  }, [length, z]);

  const back_to_previous_page = () => {
    history.goBack();
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input !== "") {
      console.log(signInAs);
      console.log(input);
      if (chatName) {
        if (image) {
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
        } else {
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

  const seeMoreMessages = (e) => {
    e.preventDefault();
    console.log(length);
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
              .limit(limit + 20)
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

    setLimit(limit + 20);
    setLength(length - 20);
  };

  return (
    <>
      <Container>
        <div className="messages_section_header">
          <ArrowBackIcon
            className="arrowBack_icon"
            onClick={back_to_previous_page}
          />
          <p>{chatName}</p>
        </div>
        {/* {sendPdf === false ? (
              <div className="messages_section_messages">
                {console.log(messages)}
                {messages.map((message) => (
                  <Doubt
                    name={message.data.name}
                    message={message.data.message}
                    timestamp={message.data.timestamp}
                    type = {message.data.type}
                    fileName = {message.data.fileName}
                    fileUrl = {message.data.fileUrl}
                    id = {message.id}
                  />
                ))}
              </div>
            ) : (
              <UploadPdf />
            )} */}
        {sendPdf === false ? (
          <div className="messages_section_messages">
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
                  <button className="see_more" onClick={seeMoreMessages}>
                    See More
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          <UploadPdf />
        )}

        {/* {sendPdf === false && (
          <div className="messages_section_footer">
          <div className="send_Message_box">
            <input type="text" placeholder="Type a message "  value={input}
                  onChange={(e) => setInput(e.target.value)}/>
           <div className="doutBox_footer_icons">
                  <div>
                    <ImageIcon className="footer_icon" />
                    <VideocamIcon className="footer_icon" />
                    <InsertDriveFileRoundedIcon
                      className="footer_icon"
                      onClick={open_send_Pdf_box}
                    />
                  </div>
                  <SendIcon
                    className="footer_icon footer_send_icon"
                    onClick={sendMessage}
                  />
                </div>
          </div>
        </div>
        )} */}
        {sendPdf === false && (
          <div className="messages_section_footer">
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
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .messages_section_header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 10px;
    p {
      width: 100%;
      text-align: left;
      margin-bottom: 0px;
      font-size: 22px;
      margin-left: 20px;
      font-weight: bold;
    }

    .arrowBack_icon {
      margin-top: 5px;
    }
  }

  .messages_section_messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: #5094ee;
  }

  .messages_section_footer {
    border-top: 1px solid gray;
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

  .send_div {
    display: flex;
    width: 80%;
    justify-content: flex-end;
    margin-left: auto;
  }
`;

export default MessagesSectionForMobile;
