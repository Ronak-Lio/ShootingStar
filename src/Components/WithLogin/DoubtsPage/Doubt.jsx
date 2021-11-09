import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import {useHistory} from "react-router-dom"
function Doubt({ name, message, timestamp, type, fileName, fileUrl ,id}) {
  const history = useHistory();
  const[{} , dispatch] = useStateValue();
  const view_pdf = (e) => {
    history.push("/viewPdf");
    dispatch({
      type : actionTypes.SET_VIEW_PDF,
      viewPdf : true
    });
    dispatch({
      type : actionTypes.SET_PDF_URL,
      pdfUrl : fileUrl
    })
  }
  return (
    <>
      <Container>
        <div className="doubt">
          <div className="doubt_name">
            <p>{name}</p>
          </div>
          <div className="doubt_message">
            {type !== "pdf" && <p>{message}</p>}
            {type === "pdf" && (
              <p className = "pdf_link" onClick = {view_pdf}>
                {fileName}
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  .doubt {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-left: auto;
    margin-top: 10px;
    margin-bottom: 4px;
    max-width: 60%;
    width: fit-content;
  }

  .doubt_message {
    position: relative;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    p {
      font-size: 14px;
      padding: 10px;
      margin-bottom: 0px;
      padding-bottom: 4px !important;
    }

    .pdf_link{
      color : #0084ff;
      &:hover {
        cursor : pointer;
        color : black;
      }
    }
  }

  .doubt_name {
    p {
      font-weight: 700;
      font-size: xx-small;
      font-style: italic;
      margin-bottom: 2px;
      margin-top: 0px;
      padding: 0px;
      margin-left: 5px;
    }
  }

  .view_replies {
    font-size: 10px;
    margin-left: 9px;
    /* color : blue; */
    font-style: italic;
    text-decoration: underline;
    margin-top: 2px;
    margin-bottom: 0px;
    &:hover {
      cursor: pointer;
      color: white;
    }
  }

  @media (max-width: 500px) {
    .doubt {
      margin-bottom: 0px;
      margin-bottom: 0px;
    }
  }
`;

export default Doubt;
