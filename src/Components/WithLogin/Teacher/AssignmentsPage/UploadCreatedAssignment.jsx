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
    {
      user,
      teacherCourseId,
      teacherSubjectId,
      signInAs,
      assignmentTeacherDetails,
      studentName,
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
  const [loading, setLoading] = useState(false);

  // onchange event
  const fileType = ["application/pdf"];

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
    history.goBack();
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
          setLoading(false);
          history.goBack();
          dispatch({
            type: actionTypes.CREATE_ASSIGNMENT_DETAILS,
            createAssignmentDetails: {
              name: fileName,
              url: downloadURL,
            },
          });
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
          <Section>
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
            <div className="submit_button_div">
              <button onClick={submit_assignment}>Submit</button>
            </div>
          </Section>
        ) : (
          <Loading />
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
