import React from "react";
import "../Primary Education/PrimaryEducation.css";
import Header from "../../Header/Header";
import Title from "../CourseArchieve/Title";
import HomeFooter from "../../Home/HomeFooter";
import styled from "styled-components";
import Sidebar from "../../Sidebar/Sidebar"
function Languages() {
  return (
    <div className="Education">
      <Header />
      <Title title="Languages" />
      <Container>
        <div className="middle">
        <div className="image_container"></div>
         <div className="content">
         <p className="courseName">Languages</p>
          <p className="course_Information">Course Information</p>
         <div className="courseInfo">
             <div className="subInfo">
                 <p className = "subInfo_left">Grade</p>
                 <p className = "subInfo_right">1 to 12</p>
             </div>
             <div className="subInfo">
                 <p className = "subInfo_left">Course Duration</p>
                 <p className = "subInfo_right">20 hours(basic)</p>
             </div>
         </div>
         <div className="courseDescription">
             <p className="course_Information">Description
             </p>
             <p className="description">
             Learning a new language opens multiple doors and carries its own compelling advantages. A quick Google search on "benefits of learning a new language" would result in over 1 billion results in less than a second.
             <br></br>
             <br></br>
             It has been scientifically proven that learning a new language boosts brain power, improves memory, enhances decision-making skills and cognitive abilities, increases networking skills and provides better career choices. Hence we offer our language courses for students and adults alike, because it is never too late to learn a language, and it is always a good idea to do so.
             <br></br>
             <br></br>
             We have trained professionals ready to help you discover the beauty of the following languages:
             <br></br>
              1.English
              <br></br>
              2.French
              <br></br>
              3.German
              <br></br>
              4.Hindi
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
    background-image: url("https://shootingstareducation.com/assets/img/courses/languages.jpg");
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

export default Languages;
