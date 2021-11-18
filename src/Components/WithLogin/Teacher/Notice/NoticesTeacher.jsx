import React, { useEffect, useState } from "react";
import styled from "styled-components";
import db from "../../../../firebase";
import { useStateValue } from "../../../../StateProvider";
import AddNotice from "./AddNotice";
import NoticeTeacher from "./NoticeTeacher";
import UpdateNoticeTeacher from "./UpdateNoticeTeacher";

function NoticesTeacher() {
  const [{ signInAs }, dispatch] =useStateValue();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    if (signInAs?.currentSubjectID && signInAs?.currentCourseID) {
      db.collection("Courses")
        .doc(signInAs?.currentCourseID)
        .collection("Subjects")
        .doc(signInAs?.currentSubjectID)
        .collection("notices")
        .onSnapshot((snapshot) =>
          setNotices(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }
  }, [signInAs?.currentSubjectID, signInAs?.currentSubjectID]);

  console.log(notices);
  return (
    <>
      <Container>
        <UpdateNoticeTeacher />
        <div className="all_notices">
          {notices.map((notice,id) => (
            <NoticeTeacher notice={notice} id={id}/>
          ))}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  padding-top: 15px;
  height: 80vh;

  .all_notices {
    margin-top: 14px;
    height: 60vh;
    overflow-y: scroll;
  }
  .For__Teacher {
    display: flex;
  }
  .Update {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
  }
  .addNotice {
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 8px;
    background-color: white;
    border-radius: 8px;
    cursor: pointer;
  }
  .addNotice_2{
    cursor: pointer;

  }
  .plusText {
    display: flex;
    padding-left: 12px;
    font-weight: 700;
  }
`;

export default NoticesTeacher;
