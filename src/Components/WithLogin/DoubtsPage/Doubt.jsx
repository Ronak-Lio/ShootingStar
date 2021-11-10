import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import { useHistory } from "react-router-dom";
function Doubt({message}) {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  const view_pdf = (e) => {
    history.push("/viewPdf");
    dispatch({
      type: actionTypes.SET_VIEW_PDF,
      viewPdf: true,
    });
    dispatch({
      type: actionTypes.SET_PDF_URL,
      pdfUrl: message?.data?.fileUrl,
    });
  };
  return (
    <>
      <Container>
        <div className="doubt">
          <div className="doubt_name">
            <p>{message?.data?.name}</p>
          </div>
          <div className="doubt_message">
            {message?.data?.type === "text" && <p>{message?.data?.message}</p>}
            {message?.data?.type === "pdf" && (
              <p className="pdf_link" onClick={view_pdf}>
                {message?.data?.fileName}
              </p>
            )}
            {message?.data?.type === "image" && (
              <>
                {message?.data?.message?(
                   <img className = "image_with_message"src= {message?.data?.imageURL} alt=""/>
                ):(
                  <img src= {message?.data?.imageURL} className="image_without_message" alt=""/>
                )}
               {message?.data?.message && (
                 <p>{message?.data?.message}</p>
               )}
              </>
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

    .image_with_message{
      height: 200px;
      object-fit: contain;
      border-top-right-radius : 10px;
      border-top-left-radius : 10px;
    }

    .image_without_message{
      height: 200px;
      object-fit: contain;
      border-radius : 10px;
    }

    .pdf_link {
      color: #0084ff;
      &:hover {
        cursor: pointer;
        color: black;
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
