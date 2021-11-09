import React, { useEffect, useState } from "react";
import styled from "styled-components";
import db from "../../../firebase";
import { useStateValue } from "../../../StateProvider";

function UpcomingClass() {
  const [{ signInAs, user, course_Subject, course_Main,course_SubjectID,course_MainID }, dispatch] =useStateValue();
    const [noticesHeader,setNoticesHeader]=useState([]);
    
    useEffect(() => {
        if (course_MainID && course_SubjectID) {
          db.collection("Courses")
            .doc(course_MainID)
            .collection("Subjects")
            .doc(course_SubjectID)
            .collection("noticesHeader")
            .onSnapshot((snapshot) =>
              setNoticesHeader(
                snapshot.docs.map((doc) => ({
                  data: doc.data(),
                  id: doc.id,
                }))
              )
            );
        }
      }, [course_MainID, course_SubjectID]);
      // console.log(noticesHeader[0].data.)
  return (
    <>
      <Container>
        <div className="upcoming_class">
          <p className="upcoming_class_timing">
            {noticesHeader && noticesHeader[0]?.data?.upcomingclass}
          </p>
          <p className="upcoming_class_topic">Topic : {noticesHeader && noticesHeader[0]?.data?.topic}</p>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #e9e7e7;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
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
`;

export default UpcomingClass;
