import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import { IconButton } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useStateValue } from "../../../../StateProvider";
import db from "../../../../firebase";

function UpdateNoticeTeacher() {
  const [{ signInAs, user,teacherSubjectId,teacherCourseId}, dispatch] =useStateValue();
  const [updatedivshow, setUpdatedivshow] = useState(false);
  const [addNotice, setAddNotice] = useState(false);
  const [updateclass, setUpdateclass] = useState("");
  const [updatetopic, setUpdatetopic] = useState("");
  const [notice,setNotice]=useState("");
  const [noticesHeader,setNoticesHeader]=useState([]);
  
  useEffect(()=>{
    if(teacherCourseId && teacherSubjectId){
      db.collection('Courses').doc(teacherCourseId).collection("Subjects").doc(teacherSubjectId).collection('noticesHeader').onSnapshot((snapshot)=>(
        setNoticesHeader(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        )
      ))
    }
  },[teacherCourseId,teacherSubjectId]);

  const UpdateClass=(e)=>{
    e.preventDefault();
      if(teacherCourseId && teacherSubjectId){
       if(noticesHeader[0]?.data?.topic){
         db.collection('Courses').doc(teacherCourseId).collection("Subjects").doc(teacherSubjectId).collection('noticesHeader').doc(noticesHeader[0]?.id).update({
           upcomingclass:updateclass,
           topic:updatetopic,
          })
        }else{
         db.collection('Courses').doc(teacherCourseId).collection("Subjects").doc(teacherSubjectId).collection('noticesHeader').add({
           upcomingclass:updateclass,
           topic:updatetopic,
         })
       }
      }
      setUpdateclass('');
      setUpdatetopic('');
      setUpdatedivshow(false);
  }
  const AddNotice=(e)=>{
    e.preventDefault();
    if(teacherCourseId && teacherSubjectId){
      db.collection('Courses').doc(teacherCourseId).collection("Subjects").doc(teacherSubjectId).collection('notices').add({
        notice:notice,
        teacher:signInAs?.name,
      })
    }
    setNotice('');
    setAddNotice(false)
  }
  return (
    <>
      <Container>
        {updatedivshow && (
          <div className="popupDelete">
            <div className="popupDeleteIn">
              <div className="popupDeleteIntop">
                <div className="name">Update</div>
                <div
                  className="Backicon"
                  onClick={() => setUpdatedivshow(!updatedivshow)}
                >
                  <ClearRoundedIcon className="Backiconi" />
                </div>
              </div>
              <div className="popupbody">
                <input
                  placeholder="Upcoming class"
                  value={updateclass}
                  onChange={(e) => setUpdateclass(e.target.value)}
                  />
                <input
                  placeholder="Topic"
                  value={updatetopic}
                  onChange={(e) => setUpdatetopic(e.target.value)}
                />
                <div className="btn" >
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={UpdateClass}>Update</Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        )}
        {addNotice && (
          <div className="popupDelete">
            <div className="popupDeleteIn">
              <div className="popupDeleteIntop">
                <div className="name">Add Notice</div>
                <div
                  className="Backicon"
                  onClick={() =>  setAddNotice(!addNotice)}
                >
                  <ClearRoundedIcon className="Backiconi" />
                </div>
              </div>
              <div className="popupbody">
                <textarea
                  placeholder="Notice "
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
                />
                <div className="btn">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={AddNotice}>Add</Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="upcoming_class">
          <p className="upcoming_class_timing">
            {noticesHeader[0]?.data?.upcomingclass}
          </p>
          <p className="upcoming_class_topic">Topic : {noticesHeader[0]?.data?.topic}</p>
        </div>
        <div className="addNotice"  onClick={() => setUpdatedivshow(!updatedivshow)}>
          <div className="iconPlus">
            <UpdateRoundedIcon />
          </div>
          <div
            className="plusText"
          >
            Update Upcoming Class
          </div>
        </div>
        <div className="addNotice_2"  onClick={() => setAddNotice(!addNotice)}>
          <div className="iconPlus">
            <ControlPointRoundedIcon />
          </div>
          <div className="plusText">Add Notice</div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #e9e7e7;
  padding: 10px;
  border-radius: 10px;
  /* margin-bottom: 20px; */
  border: 1px solid lightgray;

  .upcoming_class {
    display: flex;
    flex-direction: column;
  }

  .upcoming_class_timing {
    margin-bottom: 5px;
    font-size: 17px;
  }

  .upcoming_class_topic {
    margin-bottom: 5px;
    font-size: 16px;
    font-style: italic;
  }
  .addNotice {
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 8px;
    background-color: white;
    border-radius: 8px;
    margin: 12px 0;
  }
  .addNotice_2 {
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 8px;
    background-color: white;
    border-radius: 8px;
  }
  .iconPlus {
    color: #4b4949;
  }
  .plusText {
    display: flex;
    padding-left: 12px;
    font-weight: 700;
    color: #2074e2;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popupbody {
    display: flex;
    flex-direction: column;
    padding: 0 12px 12px 12px;
    font-weight: 500;
    /* align-items: center; */
    /* justify-content: center; */
    height: fit-content;
  }
  .popupbody > input {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    color: #383434;
    width: 100%;
    border-radius: 6px;
    height: 5vh;
    border: none;
    outline: none;
    border: 1px solid lightgray;
    resize: none;
    margin: 12px 0 12px 0;
  }
  .popupbody>textarea{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    color: #383434;
    width: 100%;
    border-radius: 6px;
    height: 30vh;
    border: none;
    outline: none;
    border: 1px solid lightgray;
    resize: none;
    margin: 12px 0 12px 0;
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

export default UpdateNoticeTeacher;
