import React, { useState } from "react";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import { IconButton } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";

function NoticeTeacher({ notice}) {
  const [{ signInAs, user, teacherSubjectId, teacherCourseId }, dispatch] =
    useStateValue();
  const [popupshowD, setPopupshowD] = useState(false);
  const [popupshowU, setPopupshowU] = useState(false);

  const deleteNotice = (e) => {
    e.preventDefault();
    if(teacherCourseId){
      db.collection("Courses")
      .doc(teacherCourseId)
      .collection("Subjects")
      .doc(teacherSubjectId)
      .collection("notices")
      .doc(notice.id)
      .delete()
      
    }else{
      alert('Something went wrong please try again ! ')
    }
    setPopupshowD(false)
  };

  const [content, setContent] = useState("");
  console.log(notice);
  return (
    <>
      <Container>
        {popupshowD && (
          <div className="popupDelete">
            <div className="popupDeleteIn">
              <div className="popupDeleteIntop">
                <div className="name">Notice</div>
                <div
                  className="Backicon"
                  onClick={() => setPopupshowD(!popupshowD)}
                >
                  <ClearRoundedIcon className="Backiconi" />
                </div>
              </div>
              <div className="popupbody">
                <div className="popupbody_text">{notice?.data?.notice}</div>
                <div className="btn">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={deleteNotice}
                    >
                      Delete
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        )}

        {popupshowU && (
          <div className="popupDelete">
            <div className="popupDeleteIn">
              <div className="popupDeleteIntop">
                <div className="name">Notice</div>
                <div
                  className="Backicon"
                  onClick={() => {
                    setPopupshowU(!popupshowU);
                  }}
                >
                  <ClearRoundedIcon className="Backiconi" />
                </div>
              </div>
              <div className="popupbody">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        <div className="close_notice"></div>
        <div className="notice">{notice?.data?.notice}</div>
        <div className="For__Teacher">
          <div className="sent_by">{notice.data?.teacher}</div>
          <div
            className="Update"
            onClick={() => {
              setPopupshowD(!popupshowD);
            }}
          >
            <IconButton>
              <DeleteRoundedIcon id="update" />
            </IconButton>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;

  .close_notice {
    display: flex;
    justify-content: flex-end;
  }

  .close_icon {
    font-size: 19px;
    &:hover {
      cursor: pointer;
      color: #6d6969;
    }
  }
  .notice {
    font-size: 15px;
    padding: 12px 0 3px 0;
    word-break: break-all;
  }
  .sent_by {
    text-align: right;
    font-size: 14px;
    font-weight: 700;
    font-style: italic;
    color: #0e45c5;
  }
  .For__Teacher {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .Update {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
  }
  #update {
    color: #464749;
  }
  .popupDelete {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #858484cc;
    z-index: 1;
  }
  .popupDeleteIn {
    max-width: 500px;
    width: 80vw;
    height: fit-content;
    background-color: white;
    border-radius: 8px;
  }
  .popupDeleteIntop {
    display: flex;
    height: fit-content;
    align-items: center;
    justify-content: center;
    padding: 12px 0px 12px 0;
    margin-bottom: 10px;
    border-bottom: 2px solid #2370e2;
  }
  .name {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: large;
  }
  .Backicon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 12px;
  }
  .Backiconi {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popupbody {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    /* align-items: center; */
    /* justify-content: center; */
    height: fit-content;
    padding: 12px;
  }
  .popupbody_text {
    padding: 0 0 12px 0;
  }
  .popupbody > textarea {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    color: #383434;
    width: 100%;
    border-radius: 12px;
    height: 100%;
    border: none;
    outline: none;
    border: 1px solid lightgray;
    resize: none;
  }
  .btn {
    position: relative;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  @media (max-width: 768px) {
    .popupDeleteIn {
      width: 95vw;
    }
  }
`;

export default NoticeTeacher;
