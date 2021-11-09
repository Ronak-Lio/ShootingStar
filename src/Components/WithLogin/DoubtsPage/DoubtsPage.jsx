import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./DoubtsPage.css";
import Doubt from "./Doubt";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DoubtReplies from "./DoubtReplies";
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
import UploadPdf from "./UploadPdf"

function DoubtsPage() {
  const [
    {
      openDoubtReplies,
      course_MainID,
      course_SubjectID,
      user,
      userCourseId,
      userSubjectId,
      signInAs,
      course_Subject,
      sendPdf,
    },
    dispatch,
  ] = useStateValue();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (
      user &&
      userCourseId &&
      userSubjectId &&
      course_MainID &&
      course_SubjectID
    ) {
      db.collection("students")
        .doc(user?.uid)
        .collection("courses")
        .doc(userCourseId)
        .collection("subjects")
        .doc(userSubjectId)
        .collection("messagesToTeacher")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );

      setInput("");

      db.collection("Courses")
        .doc(course_MainID)
        .collection("Subjects")
        .doc(course_SubjectID)
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
    userCourseId,
    userSubjectId,
    course_MainID,
    course_SubjectID,
    messages.length,
  ]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: false,
    });
  }, []);


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

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(signInAs);
    console.log(input);
    if (signInAs.name && userCourseId && userSubjectId && input) {
      console.log("User Course Id is", userCourseId);
      console.log("User Subject Id is", userSubjectId);
      db.collection("students")
        .doc(user?.uid)
        .collection("courses")
        .doc(userCourseId)
        .collection("subjects")
        .doc(userSubjectId)
        .collection("messagesToTeacher")
        .add({
          name: signInAs.name,
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      let x = 0;
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].data.name === signInAs.name) {
          x = 1;
        }
      }
      if (x === 0) {
        db.collection("Courses")
          .doc(course_MainID)
          .collection("Subjects")
          .doc(course_SubjectID)
          .collection("doubtRooms")
          .add({
            name: signInAs.name,
          })
          .then(() => {
            db.collection("Courses")
              .doc(course_MainID)
              .collection("Subjects")
              .doc(course_SubjectID)
              .collection("doubtRooms")
              .where("name", "==", signInAs.name)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());

                  db.collection("Courses")
                    .doc(course_MainID)
                    .collection("Subjects")
                    .doc(course_SubjectID)
                    .collection("doubtRooms")
                    .doc(doc.id)
                    .collection("messages")
                    .add({
                      name: signInAs.name,
                      message: input,
                      timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          });
      } else {
        db.collection("Courses")
          .doc(course_MainID)
          .collection("Subjects")
          .doc(course_SubjectID)
          .collection("doubtRooms")
          .where("name", "==", signInAs.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());

              db.collection("Courses")
                .doc(course_MainID)
                .collection("Subjects")
                .doc(course_SubjectID)
                .collection("doubtRooms")
                .doc(doc.id)
                .collection("messages")
                .add({
                  name: signInAs.name,
                  message: input,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
      setInput("");
    }
  };

  const open_send_Pdf_box = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: true,
    });
  };



  return (
    <>
      <div className="dbPage_header">
        <HeaderMain />
      </div>
      <div className="doubtsPage">
        <div className="upcoming_class">
          <p>Upcoming class at 14:33 on Monday</p>
          <div className="header_buttons">
            <button className="notice_button" onClick={open_noticesPopup}>
              Notices
            </button>
            <button
              className="notice_button_for_mobile"
              onClick={goToNoticesPage}
            >
              Notices
            </button>
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
                <p>{course_Subject}</p>
              </div>
              <button
                className="ask_doubt_button"
                onClick={open_ask_doubt_popup}
              >
                Ask a doubt
              </button>
            </div>
            {sendPdf === false ? (
              <div className="doubtBox_doubts">
                {messages.map((message) => (
                  <Doubt
                    name={message.data.name}
                    message={message.data.message}
                    timestamp={message.data.timestamp}
                    type={message.data.type}
                    fileName={message.data.fileName}
                    fileUrl={message.data.fileUrl}
                    id={message.id}
                  />
                ))}
              </div>
            ) : (
              <UploadPdf/>
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
  height: 100%;
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
    height: 100vh;
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
  }

  .doubtBox_doubts {
    /* background-color: #eeeded; */
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: #5094ee;
    padding-bottom : 10px;
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

  @media (max-width: 1024px) {
    flex: 1;
  }
`;

export default DoubtsPage;
