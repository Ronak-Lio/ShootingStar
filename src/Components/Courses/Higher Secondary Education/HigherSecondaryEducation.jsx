import React from "react";
import "../Primary Education/PrimaryEducation.css";
import Header from "../../Header/Header";
import Title from "../CourseArchieve/Title";
import HomeFooter from "../../Home/HomeFooter";
import styled from "styled-components";
import Sidebar from "../../Sidebar/Sidebar"
function HigherSecondaryEducation() {
  return (
    <div className="Education">
      <Header />
      <Title title="Higher Secondary Education" />
      <Container>
        <div className="middle">
        <div className="image_container"></div>
         <div className="content">
         <p className="courseName">Higher Secondary Education</p>
          <p className="course_Information">Course Information</p>
         <div className="courseInfo">
             <div className="subInfo">
                 <p className = "subInfo_left">Grade</p>
                 <p className = "subInfo_right">9 to 12</p>
             </div>
             <div className="subInfo">
                 <p className = "subInfo_left">Batches</p>
                 <p className = "subInfo_right">one on one, group of 3-4</p>
             </div>
             <div className="subInfo">
                 <p className = "subInfo_left">Course Duration</p>
                 <p className = "subInfo_right">11 months</p>
             </div>
             <div className="subInfo">
                 <p className = "subInfo_left">Course Start</p>
                 <p className = "subInfo_right">March 15, 2021</p>
             </div>
         </div>
         <div className="courseDescription">
             <p className="course_Information">Description
             </p>
             <p className="description">
             Higher secondary education might just be the turning point of students' lives. It is during these 4 crucial years that students pick their preferred streams upon their entrance into High School and begin studying the subjects that are going to introduce them to the career path they would like to take.
             <br></br>
             <br></br>
             These subjects form the basic foundation of the next couple of years of their higher education. Hence it is vital that these foundations are strengthened from the get-go and students develop the interest in their chosen subject that they shall carry forward for a lifetime. Moreover, many students also attempt crucial Board exams during these years.
             <br></br>
             <br></br>
             At Shooting Stars, we offer multiple flexible and personal courses customizable according to students' needs and choices so that the academic aspect of High School is well taken care of. We recognise that High School is also about socialising and exploring extracurriculars, and hence we aim to develop a schedule that allows students the time to devote to their interests outside of academics.
             <br></br>
             <br></br>
             <p className="heading">What we offer:</p>
             Grades 9 & 10 Prep courses for ICSE and CBSE Board Examinations.
             <br></br>
             Grade 11 & 12 we offer individual subjects Commerce (Accountancy, Business Studies & Entrepreneurship), Science ( Physics, Chemistry & Biology ), Maths, English.
             <br></br>
             Grades 11 & 12 Prep courses for ISC, CBSE, and IB Board Examinations.
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
  justify-content: center;
  flex-direction: row;
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
    background-image: url("https://shootingstareducation.com/assets/img/courses/highersecondary.jpg");
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

    .heading{
        font-weight : bold;
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

export default HigherSecondaryEducation;
