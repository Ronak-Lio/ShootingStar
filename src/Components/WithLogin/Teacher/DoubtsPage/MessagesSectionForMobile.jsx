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

function MessagesSectionForMobile() {
  const [
    {
      openDoubtReplies,
      user,
      signInAs,
      teacherCourseId,
      teacherSubjectId,
      userCourseId,
      userSubjectId,
      chatName,
      sendPdf,
      teacherCourse,
      teacherSubject
    },
    dispatch,
  ] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (
      user &&
      teacherCourseId &&
      teacherSubjectId
    ) {
      console.log(teacherCourseId);

      setInput("");

      db.collection("Courses")
        .doc(teacherCourseId)
        .collection("Subjects")
        .doc(teacherSubjectId)
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
    teacherCourseId,
    teacherSubjectId,
    userCourseId,
    userSubjectId,
    messages.length,
  ]);
   
  useEffect(() => {
    if(user && teacherCourseId && teacherSubjectId && chatName){
      db.collection("Courses")
    .doc(teacherCourseId)
    .collection("Subjects")
    .doc(teacherSubjectId)
    .collection("doubtRooms")
    .where("name", "==", chatName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        db.collection("Courses")
          .doc(teacherCourseId)
          .collection("Subjects")
          .doc(teacherSubjectId)
          .collection("doubtRooms")
          .doc(doc.id)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setMessages(
              snapshot.docs.map((doc) => ({
                data: doc.data(),
                id : doc.id
              }))
            )
          );
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
    }
  }, [chatName])
  const back_to_previous_page = () => {
    history.goBack();
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if(input!== "")
    { 
      console.log(signInAs);
      console.log(input);
      if (chatName && input) {
  
        db.collection("students")
          .where("name", "==", chatName)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              console.log(signInAs)
              db.collection("students")
                .doc(doc.id)
                .collection("courses")
                .where("name", "==", teacherCourse)
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
                      .where("name", "==", teacherSubject)
                      .get()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                          // doc.data() is never undefined for query doc snapshots
                          console.log(doc2.id, " => ", doc2.data());
                          console.log("REACHED" , doc.id , doc1.id , doc2.id)

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
            .doc(teacherCourseId)
            .collection("Subjects")
            .doc(teacherSubjectId)
            .collection("doubtRooms")
            .where("name", "==", chatName)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
  
                db.collection("Courses")
                  .doc(teacherCourseId)
                  .collection("Subjects")
                  .doc(teacherSubjectId)
                  .collection("doubtRooms")
                  .doc(doc.id)
                  .collection("messages")
                  .add({
                    name: signInAs?.name,
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  });
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });

        setInput("");
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
         {sendPdf === false ? (
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
            )}
        {sendPdf === false && (
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
    padding-bottom : 10px;
  }

  .messages_section_footer{
    border-top : 1px solid gray;
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
`;

export default MessagesSectionForMobile;
