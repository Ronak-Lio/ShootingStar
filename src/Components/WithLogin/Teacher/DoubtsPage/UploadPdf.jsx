import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../../StateProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import db, { storage } from "../../../../firebase";
import firebase from "firebase";
import { actionTypes } from "../../../../reducer";
import Loading from "../../Loading/Loading";

function UploadCorrectedAssignment() {
  const history = useHistory();
  const [
    { user, signInAs, assignmentTeacherDetails, studentName, chatName },
    dispatch,
  ] = useStateValue();
  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  // const [fileUrl, setFileUrl] = useState();

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const [marks, setMarks] = useState(0);

  // onchange event
  const fileType = ["application/pdf"];

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [loading, setLoading] = useState(false);

  const [z, setZ] = useState();
  const [limit, setLimit] = useState(20);
  const [length, setLength] = useState();


  useEffect(() => {
    if (
      user &&
      signInAs?.currentCourseID &&
      signInAs?.currentSubjectID &&
      chatName
    ) {
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
                console.log("Data is ", snapshot.data());
                setZ(snapshot.data().messagesLength + 1);
                setLength(snapshot.data().messagesLength);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [signInAs, user, chatName]);

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    console.log("File Size is " , selectedFile.size)
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
          setPdfFileError("Please enter a file below 1 MB");
        }
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  // form submit
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
  };

  const back_to_previous_page = () => {
    history.goBack();
  };

  const send_assignment = async (e) => {
    e.preventDefault();
    if (viewPdf) {
      const upload = storage.ref(`files/${fileName}`).put(file);
      setLoading(true);
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

          setLoading(false);
          if (downloadURL && fileName) {
             

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
                                fileName: fileName,
                                fileUrl: downloadURL,
                                type: "pdf",
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
                    fileName: fileName,
                    fileUrl: downloadURL,
                    type: "pdf",
                    timestamp:
                      firebase.firestore.FieldValue.serverTimestamp(),
                  });
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });

            dispatch({
              type: actionTypes.SET_SEND_PDF,
              sendPdf: false,
            });
          }
        }
      );
    } else {
      alert("Please upload the file");
    }
  };

  return (
    <>
      <Container>
        {loading === false ? (
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
              <button type="submit" className="" onClick={handlePdfFileSubmit}>
                Upload
              </button>
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
            <div className="submit_button_div">
              <button onClick={send_assignment}>Send</button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}

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

export default UploadCorrectedAssignment;
