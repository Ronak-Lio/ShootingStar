import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from "../../../reducer";
import db from "../../../firebase";
import firebase from "firebase";

function AskDoubtPopup() {
  const [{ openAskDoubtPopup }] = useStateValue();
  const [input, setInput] = useState();
  const [
    {
      openDoubtReplies,
      user,
      signInAs,
    },
    dispatch,
  ] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const[z , setZ] = useState();
  const[teacher , setTeacher] = useState();

  useEffect(() => {
    if (
      user &&
      signInAs?.usercurrentCourseID &&
      signInAs?.usercurrentSubjectID &&
      signInAs?.currentCourseID &&
      signInAs?.currentSubjectID
    ) {
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

        db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .onSnapshot((snapshot) => {
          setTeacher(snapshot.data().teacher);
        });
    }
  }, [user, signInAs?.usercurrentCourseID, signInAs?.usercurrentSubjectID, signInAs?.currentCourseID, signInAs?.currentSubjectID]);


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

    }
  }, [
    user,
    signInAs?.usercurrentCourseID,
    signInAs?.usercurrentSubjectID,
    signInAs?.currentCourseID,
    signInAs?.currentSubjectID,
  ]);

  useEffect(() => {
    
  } , [z , teacher])

  const close_askDoubt_popup = () => {
    dispatch({
      type: actionTypes.OPEN_ASKDOUBT_POPUP,
      openAskDoubtPopup: false,
    });
  };

  const ask_doubt = (e) => {
    e.preventDefault();

    if (signInAs.name && signInAs?.usercurrentCourseID && signInAs?.usercurrentSubjectID && input) {
      
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
      setInput();

      dispatch({
        type: actionTypes.OPEN_ASKDOUBT_POPUP,
        openAskDoubtPopup: false,
      });
    }
  };
  return (
    <>
      {openAskDoubtPopup === true && (
        <Container>
          <div className="askDoubtPopup">
            <div className="askDoubtPopup_close">
              <CloseIcon
                className="close_icon"
                onClick={close_askDoubt_popup}
              />
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Type your doubt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div className="ask_doubt_button_div">
              <button onClick={ask_doubt}>Ask</button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .askDoubtPopup {
    background-color: #fff;
    width: 450px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;

    @media (max-width: 500px) {
      width: 80vw;
    }

    textarea {
      width: 90%;
      outline-width: 0px;
      font-size: 13px;
      resize: none;
      border: 0px;
    }

    .ask_doubt_button_div {
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
  }

  .askDoubtPopup_close {
    display: flex;
    justify-content: flex-end;
    .close_icon {
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }
  }
`;

export default AskDoubtPopup;
