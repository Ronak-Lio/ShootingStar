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

function MessagesSectionForMobile() {
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
  const history = useHistory();

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
  useEffect(() => {}, [chatName]);
  const back_to_previous_page = () => {
    history.goBack();
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input !== "") {
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
    <>
      <Container>
        <div className="messages_section_header">
          <ArrowBackIcon
            className="arrowBack_icon"
            onClick={back_to_previous_page}
          />
          <p>{chatName}</p>
        </div>
        <div className="messages_section_messages">
          {messages.map((message) => (
            <Doubt
              name={message.name}
              message={message.message}
              timestamp={message.timestamp}
            />
          ))}
        </div>
        <div className="messages_section_footer">
          <div className="send_Message_box">
            <input type="text" placeholder="Type a message "  value={input}
                  onChange={(e) => setInput(e.target.value)}/>
            <div className="icons">
              <AttachFileIcon className="attach_file_icon icon" />
              <InsertEmoticonIcon className="emoji_icon icon" />
              <SendIcon className="send_icon icon"  onClick={sendMessage}/>
            </div>
          </div>
        </div>
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
`;

export default MessagesSectionForMobile;
