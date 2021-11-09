import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../../StateProvider";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from "../../../../reducer";
import db from "../../../../firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function CreateAssignmentPopup() {
  const [
    {
      openCreateAssignmentPopup,
      user,
      teacherCourseId,
      teacherSubjectId,
      signInAs,
      createAssignmentDetails,
      teacherCourse,
      teacherSubject
    },
    dispatch,
  ] = useStateValue();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState();
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (user && teacherCourseId && teacherSubjectId) {
      db.collection("Courses")
        .doc(teacherCourseId)
        .collection("students")
        .onSnapshot((snapshot) => {
          setStudents(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          );
        });

      db.collection("Courses")
        .doc(teacherCourseId)
        .collection("Subjects")
        .doc(teacherSubjectId)
        .collection("assignments")
        .onSnapshot((snapshot) =>
          setAssignments(
            snapshot.docs.map((doc) => ({
              data : doc.data(),
            }))
          )
        );
    }
    setInput1("");
    setInput2("");
    setInput3();
    console.log(assignments);
    console.log(signInAs)
  }, [students.length, user, teacherCourseId, openCreateAssignmentPopup , teacherSubjectId]);

  
  const close_popup = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.OPEN_CREATE_ASSIGNMENT_POPUP,
      openCreateAssignmentPopup: false,
    });
  };

  const create_assignment = (e) => {
    e.preventDefault();
    console.log(students);
    let x = 0;
    for(let i = 0 ; i < assignments.length ; i++) {
      if(input1 === assignments[i].data.name){
         x = 1;
      }
    }
    if (
      input1 !== "" &&
      input2 !== "" &&
      input3  &&
      user &&
      teacherCourseId &&
      teacherSubjectId &&
      students
      && x === 0
    ) {
      if (createAssignmentDetails?.name) {
        db.collection("Courses")
          .doc(teacherCourseId)
          .collection("Subjects")
          .doc(teacherSubjectId)
          .collection("assignments")
          .add({
            name: input1,
            description: input2,
            submissionDate: input3,
            assignmentUrl: createAssignmentDetails?.url,
            assignmentUploadedName: createAssignmentDetails?.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        for (let i = 0; i < students.length; i++) {
          db.collection("students")
            .where("name", "==", students[i].data.name)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
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
                            db.collection("students")
                              .doc(doc.id)
                              .collection("courses")
                              .doc(doc1.id)
                              .collection("subjects")
                              .doc(doc2.id)
                              .collection("assignments")
                              .add({
                                name: input1,
                                description: input2,
                                submissionDate: input3,
                                timestamp:
                                  firebase.firestore.FieldValue.serverTimestamp(),
                                status: "pending",
                                assignmentUrl: createAssignmentDetails?.url,
                                assignmentUploadedName:
                                  createAssignmentDetails?.name,
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
        }
      } else {
        db.collection("Courses")
          .doc(teacherCourseId)
          .collection("Subjects")
          .doc(teacherSubjectId)
          .collection("assignments")
          .add({
            name: input1,
            description: input2,
            submissionDate: input3,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        for (let i = 0; i < students.length; i++) {
          db.collection("students")
            .where("name", "==", students[i].data.name)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
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
                            db.collection("students")
                              .doc(doc.id)
                              .collection("courses")
                              .doc(doc1.id)
                              .collection("subjects")
                              .doc(doc2.id)
                              .collection("assignments")
                              .add({
                                name: input1,
                                description: input2,
                                submissionDate: input3,
                                timestamp:
                                  firebase.firestore.FieldValue.serverTimestamp(),
                                status: "pending",
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
        }
      }

      dispatch({
        type: actionTypes.OPEN_CREATE_ASSIGNMENT_POPUP,
        openCreateAssignmentPopup: false,
      });
    } else if(x === 1){
      alert("Please choose a different name for assignment");
    }
    else{
      alert("Please fill all the details")
    }
  };
  return (
    <>
      {openCreateAssignmentPopup === true && (
        <Container>
          <div className="create_assignment">
            <div className="popup_close">
              <CloseIcon className="close_icon" onClick={close_popup} />
            </div>
            <div className="set_assignment_name">
              <p>Assignment Name:</p>
              <input
                type="text"
                placeholder="Set assignment name"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              />
            </div>
            <div className="set_assignment_description">
              <p>Assignment description:</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Type assignment description"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              ></textarea>
            </div>
            <div className="attach_assignment">
              <AttachFileIcon className="attach_file_icon" />
              <p onClick={(e) => history.push("uploadCreatedAssignment")}>
                Attatch file
              </p>
            </div>
            <div className="assignment_attatched">
              <a href={createAssignmentDetails?.url}>
                {createAssignmentDetails?.name}
              </a>
            </div>
            <div className="set_assignment_due_date">
              <p>Assignment Submission date:</p>
              <input
                type="date"
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
              />
            </div>
            <div className="create_assignment_button_div">
              <button onClick={create_assignment}>Create</button>
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

  .create_assignment {
    background-color: #fff;
    width: 600px;
    height: fit-content;
    max-height: 600px;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
    padding-left: 15px;

    .popup_close {
      display: flex;
      justify-content: flex-end;
    }

    .close_icon {
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }

    .set_assignment_name {
      display: flex;
      justify-content: space-between;
      width: 90%;
      input {
        width: 60%;
        border-radius: 6px;
        padding-left: 9px;
        padding-right: 5px;
        border: 1px solid gray;
        outline-width: 0px;
      }
      p {
        margin-top: 5px;
      }
    }
    .set_assignment_description {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 10px;
      p {
        margin-bottom: 7px;
      }
      textarea {
        width: 92%;
        outline-width: 0px;
        font-size: 13px;
        resize: none;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 10px;
      }
    }

    .set_assignment_due_date {
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin-top: 20px;

      input {
        border-radius: 6px;
        padding-left: 9px;
        padding-right: 5px;
        border: 1px solid gray;
        outline-width: 0px;
        width: 50%;
      }
      p {
        margin-top: 5px;
      }
    }

    .attach_assignment {
      display: flex;
      margin-left: 15px;
      p {
        text-decoration: underline;
        font-size: 15px;
        font-style: italic;
        &:hover {
          color: blue;
          cursor: pointer;
        }
      }
    }

    .attach_file_icon {
      color: blue;
      font-style: italic;
      font-size: 21px;
    }

    .create_assignment_button_div {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      margin-right: 10px;
      button {
        width: 100px;
        border-radius: 20px;
        background-color: #1183e0;
        color: white;
        &:hover {
          cursor: pointer;
          background-color: #63b3f5;
        }
      }
    }

    .assignment_attatched{
      max-width: 90%;

      a{
        max-width: 90%;
        overflow: hidden;
        display : flex;
        flex-wrap: wrap;
      }
    }
  }
`;

export default CreateAssignmentPopup;
