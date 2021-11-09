import React , {useState , useEffect} from 'react'
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory , useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import db, { storage } from "../../../firebase";
import firebase from "firebase";
import { actionTypes } from "../../../reducer";

function ViewPdf() {
    // const [fileUrl, setFileUrl] = useState();
  
    // for submit event
  
    // onchange event
    const fileType = ["application/pdf"];

    const doubtId = useParams();
    const history = useHistory(); 
  
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const[{viewPdf , pdfUrl} , dispatch] = useStateValue();




    useEffect(() => {
        if(viewPdf === false) {
            history.goBack();
        }
    } , [viewPdf])

    useEffect(() => {

    } , [pdfUrl])


    const back_to_previous_page = () => {
        history.goBack();
      };

    return (
        <Container>
             <div className="viewPdf_header">
            <ArrowBackIcon
              onClick={back_to_previous_page}
              className="arrow_back_icon"
            />
          </div>
           <div className="pdf-container">
            {/* show pdf conditionally (if we have one)  */}
            {pdfUrl && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl= {pdfUrl}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}

            {/* if we dont have pdf or viewPdf state is null */}
            {!viewPdf && <>No pdf file selected</>}
          </div>  
        </Container>
    )
};

const Container  = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f1efef;

  .viewPdf_header{
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

  .pdf-container {
    width: 90%;
    height: 90%;
    background-color: #e4e4e4;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  .arrow_back_icon{
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

  
`

export default ViewPdf
