import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import UpcomingClass from "./UpcomingClass"
import Notice from "./Notice"
import db from '../../../firebase';
import { useStateValue } from '../../../StateProvider';

function Notices() {
    const [{ signInAs, user, course_Subject, course_Main,course_SubjectID,course_MainID }, dispatch] =useStateValue();
    const [notices,setNotices]=useState([]);
    
    useEffect(() => {
        if (course_MainID && course_SubjectID) {
          db.collection("Courses")
            .doc(course_MainID)
            .collection("Subjects")
            .doc(course_SubjectID)
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
      }, [course_MainID, course_SubjectID]);
console.log(notices)
    return (
        <>
            <Container> 
              <UpcomingClass/>
               <div className="all_notices">
                   {notices.map((notice)=>(
                   <Notice notice={notice}/>
                   ))}
               </div>
            </Container>
        </>
    )
};

const Container=styled.div`
  margin:20px;
  margin-top : 0px;
  width : 100%;
  border-radius : 10px;
  padding : 10px;
  padding-top : 15px;
  height: 80vh;

  .all_notices{
      margin-top : 40px;
      height : 60vh;
      overflow-y: scroll;
  }
`;


export default Notices;
