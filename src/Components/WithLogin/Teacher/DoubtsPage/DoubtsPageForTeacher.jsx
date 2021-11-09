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
import HeaderTeacher from "../HeaderTeacher/HeaderTeacher";
import firebase from "firebase";

function DoubtsPageForTeacher() {
  const [
    {
      openDoubtReplies,
      user,
      course_Main,
      course_MainID,
      course_SubjectID,
      userCourseId,
      userSubjectId,
      chatName,
      signInAs,
      course_Subject,
    },
    dispatch,
  ] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (
      user &&
      course_MainID &&
      course_SubjectID &&
      userCourseId &&
      userSubjectId
    ) {
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
              .orderBy("timestamp", "asc")
              .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
              );
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

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
  }, [
    user,
    course_MainID,
    course_SubjectID,
    userCourseId,
    userSubjectId,
    messages.length,
  ]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_CHATNAME,
      chatName: rooms[0]?.data?.name,
    });
  }, [rooms.length]);

  useEffect(() => {}, [chatName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if(input!== "")
    { 
      console.log(signInAs);
      console.log(input);
      if (signInAs.name && userCourseId && userSubjectId && input) {
        console.log("User Course Id is", userCourseId);
        console.log("User Subject Id is", userSubjectId);
  
        db.collection("students")
          .where("name", "==", chatName)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              db.collection("students")
                .doc(doc.id)
                .collection("courses")
                .where("name", "==", course_Main)
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
                      .where("name", "==", course_Subject)
                      .get()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                          // doc.data() is never undefined for query doc snapshots
                          console.log(doc2.id, " => ", doc2.data());
                          db.collection("students")
                            .doc(doc.id)
                            .collection("courses")
                            .doc(doc1.id)
                            .collection("subjects")
                            .doc(doc2.id)
                            .collection("messagesToTeacher")
                            .add({
                              name: signInAs.name,
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
    }
  };

  return (
    <div className="doubtsPageforTeacher">
      <HeaderTeacher/>
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
              <div className="doubt_section_doubts_messages">
                {console.log(messages)}
                {messages.map((message) => (
                  <Doubt
                    name={message.name}
                    message={message.message}
                    timestamp={message.timestamp}
                  />
                ))}
              </div>
            <div className="doubtBox_footer">
              <div className="send_Message_box">
                <input
                  type="text"
                  placeholder="Type a message "
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="icons">
                  <AttachFileIcon className="attach_file_icon icon" />
                  <InsertEmoticonIcon className="emoji_icon icon" />
                  <SendIcon className="send_icon icon" onClick={sendMessage} />
                </div>
              </div>
            </div>
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

  .doubt_section_doubts_messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: #5094ee;
    padding-bottom : 10px;
  }
`;

export default DoubtsPageForTeacher;
