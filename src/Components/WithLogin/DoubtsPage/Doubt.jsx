import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import { useHistory } from "react-router-dom";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ReactPlayer from "react-player";
import { Player } from "video-react";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import db from "../../../firebase";

function Doubt({ message, roomId }) {
  const history = useHistory();
  const [{ signInAs, user }, dispatch] = useStateValue();
  const [popupshowImageFUll, setPopupshowImageFUll] = useState(false);
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

  const delete_doubt = (e) => {
    e.preventDefault();
    if (signInAs?.value === "student") {
      db.collection("students")
        .doc(user?.uid)
        .collection("courses")
        .doc(signInAs?.usercurrentCourseID)
        .collection("subjects")
        .doc(signInAs?.usercurrentSubjectID)
        .collection("messagesToTeacher")
        .doc(message?.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    } else if (signInAs?.value === "teacher" && roomId) {
      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .collection("doubtRooms")
        .doc(roomId)
        .collection("messages")
        .doc(message?.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  };
  return (
    <>
      {popupshowImageFUll && (
        <div className="popupChatTeacher">
          <div
            className="popUpTOP"
            onClick={() => setPopupshowImageFUll(!popupshowImageFUll)}
          >
            <div className="popUpTOP__first">
              <h6>{message.data?.name}</h6>
            </div>
            <ClearRoundedIcon className="backIconChat" />
          </div>
          <div className="popupbodyImage_Img">
            <img
              src={message.data?.imageURL}
              alt=""
              className="popupbody_Image_img"
            />
          </div>
        </div>
      )}
      <Container>
        <div
          className={
            message?.data?.name === signInAs?.name ? `doubt` : `doubt_receiver`
          }
        >
          <div className="doubt_name">
            <p>{message?.data?.name}</p>
          </div>
          <div className="doubt_message">
            <div>
              {message?.data?.type === "text" && (
                <p>{message?.data?.message}</p>
              )}
              {message?.data?.type === "pdf" && (
                <p className="pdf_link" onClick={view_pdf}>
                  {message?.data?.fileName}
                </p>
              )}
              {(message?.data?.type === "image" || message?.data?.type === "video") && (
                <div className = "delete_div_for_image">
                <DeleteIcon className="delete_icon" onClick={delete_doubt} />
                </div>
              )}
              {message?.data?.type === "image" && (
                <>
                  {message?.data?.message ? (
                    <img
                      className="image_with_message"
                      src={message?.data?.imageURL}
                      onClick={() => {
                        setPopupshowImageFUll(!popupshowImageFUll);
                      }}
                      alt=""
                    />
                  ) : (
                    <img
                      src={message?.data?.imageURL}
                      className="image_without_message"
                      alt=""
                      onClick={() => {
                        setPopupshowImageFUll(!popupshowImageFUll);
                      }}
                    />
                  )}
                  <p>{message.data?.imageOriginalName}</p>
                  {message?.data?.message && <p>{message?.data?.message}</p>}
                </>
              )}
              {message.data?.type === "video" && (
                <>
                  <div className={"videoMessage"}>
                    <Player
                      playsInline
                      poster="/assets/poster.png"
                      src={message.data?.videoURL}
                    />
                    <div className="Name_Download">
                      <p>{message.data?.videoOriginalName}</p>
                      <a href={message.data?.videoURL}>
                        <ArrowCircleDownRoundedIcon fontSize="large" />
                      </a>
                    </div>
                  </div>
                  {message?.data?.message && <p>{message?.data?.message}</p>}
                </>
              )}
            </div>
            {(message?.data?.type === "text" || message?.data?.type === "pdf") && (
              <DeleteIcon className="delete_icon" onClick={delete_doubt} />
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

  .doubt_receiver {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 4px;
    max-width: 60%;
    width: fit-content;
  }

  .delete_icon {
    margin-top: 11px;
    font-size: 18px;
    color: #444343;
    &:hover {
      color: #838181;
      cursor: pointer;
    }
  }

  .doubt_message {
    position: relative;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;

    .delete_icon {
      display: none;
    }

    &:hover {
      .delete_icon {
        display: flex;
      }
    }

    p {
      font-size: 14px;
      padding: 10px;
      padding-right: 5px;
      margin-bottom: 0px;
      padding-bottom: 4px !important;
    }

    .image_with_message {
      height: 200px;
      object-fit: contain;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      &:hover {
        cursor: pointer;
      }

      @media (max-width: 1200px) {
        width: 100%;
        object-fit: contain;
        height: auto;
      }
    }

    .delete_div_for_image{
      justify-content: flex-end;
      display: flex;
      /* margin-bottom: 7px; */

      .delete_icon{
        margin-bottom : 10px;
        margin-right : 5px;
      }
    }

    .image_without_message {
      height: 200px;
      object-fit: contain;
      border-radius: 10px;

      &:hover {
        cursor: pointer;
      }

      @media (max-width: 820px) {
        width: 100%;
        object-fit: contain;
        height: auto;
      }
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
