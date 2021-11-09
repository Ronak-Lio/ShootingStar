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
import Loading from "../../Loading/Loading"

function UploadCorrectedAssignment() {
  const history = useHistory();
  const [
    {
      openAsignmentPopup,
      user,
      teacherCourseId,
      teacherSubjectId,
      signInAs,
      assignmentTeacherDetails,
      studentName,
      uploadCorrectedAssignment,
      teacherCourse, 
      teacherSubject
    },
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
  const[loading , setLoading] = useState(false)

  // onchange event
  const fileType = ["application/pdf"];

  useEffect(() => {
      if(uploadCorrectedAssignment === false) {
        history.push("/AssignmentsPage")
      }
  }, [assignmentTeacherDetails , uploadCorrectedAssignment]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setFileName(selectedFile.name);
          setFile(selectedFile);
          setPdfFileError("");
        };
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

  const back_to_previous_page = () => {
    history.push("/AssignmentsPage")
  };

  const submit_assignment = async (e) => {
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
          const fileUrl = downloadURL;
          setLoading(false);
          history.push("/AssignmentsPage");
          if (marks && fileUrl && fileName) {
            db.collection("students")
              .where("name", "==", studentName)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  console.log(signInAs);
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
                              console.log("REACHED", doc.id, doc1.id, doc2.id);

                              db.collection("students")
                                .doc(doc.id)
                                .collection("courses")
                                .doc(doc1.id)
                                .collection("subjects")
                                .doc(doc2.id)
                                .collection("assignments")
                                .where(
                                  "name",
                                  "==",
                                  assignmentTeacherDetails?.name
                                )
                                .get()
                                .then((querySnapshot) => {
                                  querySnapshot.forEach((doc3) => {
                                    console.log(doc3.id, "=>", doc3.data());
                                    db.collection("students")
                                      .doc(doc.id)
                                      .collection("courses")
                                      .doc(doc1.id)
                                      .collection("subjects")
                                      .doc(doc2.id)
                                      .collection("assignments")
                                      .doc(doc3.id)
                                      .update({
                                        correctedAssignmentUrl: fileUrl,
                                        marks: marks,
                                        correctedAssignmentName: fileName,
                                      });
                                  });
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
              .collection("assignments")
              .where("name", "==", assignmentTeacherDetails.name)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());

                  db.collection("Courses")
                    .doc(teacherCourseId)
                    .collection("Subjects")
                    .doc(teacherSubjectId)
                    .collection("assignments")
                    .doc(doc.id)
                    .collection("answers")
                    .where("name", "==", studentName)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc1) => {
                        console.log(doc1.id, "=>", doc1.data());
                        db.collection("Courses")
                          .doc(teacherCourseId)
                          .collection("Subjects")
                          .doc(teacherSubjectId)
                          .collection("assignments")
                          .doc(doc.id)
                          .collection("answers")
                          .doc(doc1.id)
                          .update({
                            correctedAssignmentUrl: fileUrl,
                            marks: marks,
                            correctedAssignmentName: fileName,
                          });
                      });
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });

            console.log(fileUrl);
          } else {
            alert("Please re-enter all the details");
          }
        }
      );

      dispatch({
        type: actionTypes.OPEN_ASSIGNMENT_POPUP,
        openAsignmentPopup: false,
      });
    } else {
      alert("Please upload the file");
    }
  };

  return (
    <>
      <Container>
        {(loading === false ) ? (<Section>
          <div className="submit_assignment_page_header">
            <ArrowBackIcon
              onClick={back_to_previous_page}
              className="arrow_back_icon"
            />
            <p></p>
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
          <div className="marks">
            <p>Marks:</p>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>
          <div className="submit_button_div">
            <button onClick={submit_assignment}>Submit</button>
          </div>
        </Section>):(
          <Loading/>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f1efef;
`;

const Section = styled.div`
  width: 90vw;
  background-color: white;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  .submit_assignment_page_header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 10px;
    p {
      width: 100%;
      text-align: center;
      margin-bottom: 0px;
      font-size: 18px;
    }
  }

  .arrow_back_icon {
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
    height: 800px;
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
