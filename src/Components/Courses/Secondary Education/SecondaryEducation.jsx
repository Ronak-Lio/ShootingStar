import React from "react";
import "../Primary Education/PrimaryEducation.css";
import Header from "../../Header/Header";
import Title from "../CourseArchieve/Title";
import HomeFooter from "../../Home/HomeFooter"
import Sidebar from "../../Sidebar/Sidebar"
import styled from "styled-components";
function SecondaryEducation() {
  return (
    <div className="Education">
      <Header />
      <Title title="Secondary Education" />
      <Container>
        <div className="middle">
        <div className="image_container"></div>
         <div className="content">
         <p className="courseName">Secondary Education</p>
          <p className="course_Information">Course Information</p>
         <div className="courseInfo">
             <div className="subInfo">
                 <p className = "subInfo_left">Grade</p>
                 <p className = "subInfo_right">6 to 8</p>
             </div>
             <div className="subInfo">
                 <p className = "subInfo_left">Batches</p>
                 <p className = "subInfo_right">one on one, group of 3-4</p>
             </div>
             <div className="subInfo">
                 <p className = "subInfo_left">Course Duration</p>
                 <p className = "subInfo_right">Flexible</p>
             </div>
         </div>
         <div className="courseDescription">
             <p className="course_Information">Description
             </p>
             <p className="description">
             Secondary Education might just be the most essential part of a student’s journey at school. Along with slowly discovering who they are as people, these years are also when students begin to pick their favorites. These favorites soon become their high school subject choices.
             <br></br>
             <br></br>
             During these crucial years, it is imperative that students can properly build on the foundations they have acquired in Primary School, so that nothing is off the tables for them when they walk into the room of choices and negotiation before high school. It is also important that they maintain a love for learning and develop the habits that shall help them not only during their higher education, but during every walk of life – time management, resource management, scheduling and prioritizing, sticking to deadlines, managing a large content based syllabus, and responsibility.
             <br></br>
             <br></br>
             Our goal at Shooting Stars is to guide students during their crucial Middle School years, convince them that anything is possible, and help them ace everything they put their mind to academically, so that they can choose what is best for them when the time comes. We offer interactive, flexible courses online to help our students achieve just that – in the manner and with the teachers they find most comfortable.
             </p>
         </div>
         </div>
         </div>
         <div className="page_sidebar">
           <Sidebar/>
         </div>
      </Container>
      <HomeFooter/>
    </div>
  );
}

const Container = styled.div`
padding: 20px;
margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1440px;

  .middle{
    display : flex;
    flex-direction : column;
    margin-left : auto;
    margin-right : auto;

  }

  .page_sidebar{
      width : 80%;
      margin-left : 40px;
    }

  .secondBar{
    margin-top : 20px !important;
  }

  .image_container {
    width: 65vw;
    height: 60vh;
    background-image: url("https://shootingstareducation.com/assets/img/courses/secondary_848x500.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    @media (max-width:1024px) {
        width : 80vw;
        height : 40vh;
        margin-right : auto;
        margin-left : auto;
    }
  }

  .content{
    width: 65vw;
    height: fit-content;
    margin-top : 10px;

    .courseName{
        font-size : 30px;
        font-weight : 500;
    }
    .course_Information{
        font-size : 21px;
        color : #414040;
        font-weight : 400;
        border-bottom : 1px solid lightgray;
        padding-bottom: 10px;
    }

    .subInfo{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        p{
            font-size: 17px;
        }
    }

    .courseDescription{
        display: flex;
        flex-direction: column;
    }
  }

  @media(max-width:1024px) {
      display : flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0px;
      .content{
        width : 80vw;
        height : 40vh;
        margin-left: auto;
        margin-right: auto;
        .courseName{
            font-size: 30px;
        }
      }
  }

  @media(min-width:1630px){
    .content{
      width : 50vw;
    }
    .image_container{
      width : 50vw;
    }
  }
`;

export default SecondaryEducation;
