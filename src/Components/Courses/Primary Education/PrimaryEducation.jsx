import React , {useState , useEffect} from "react";
import "./PrimaryEducation.css";
import Header from "../../Header/Header";
import Title from "../CourseArchieve/Title";
import HomeFooter from "../../Home/HomeFooter";
import styled from "styled-components";
import Sidebar from "../../Sidebar/Sidebar"
import SignInPopup from "../../Header/SigInPopup"
import {useStateValue} from "../../../StateProvider"
function PrimaryEducation() {
  const[{openSignInPopup} , dispatch] = useStateValue();
  return (
    <div className="Education">
      <Header />
      <Title title="Primary Education" />
      <Container>
        <div className="middle">
        <div className="image_container"></div>
         <div className="content">
         <p className="courseName">Primary Education</p>
          <p className="course_Information">Course Information</p>
         <div className="courseInfo">
             <div className="subInfo">
                 <p className = "subInfo_left">Grade</p>
                 <p className = "subInfo_right">1 to 5</p>
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
             Being the first stage of formal education, Primary Education is the first step in helping children to fall in love with learning and ensuring that their academic foundations are strengthened, along with working on their character. Our courses are designed to provide these young, growing minds with the right tools and the best facilitators to work on both, a solid foundation for their learning, and a stronger character.
             <br></br>
             <br></br>
             During these early years, it is imperative that students develop a strong foundation in subjects such as English, Mathematics, Science, Social Studies, and Computer Studies as these are essential for their education in higher grades. It is also important that they do not distance themselves from learning, or begin to resent it. Instead, they should, from a young age, begin to develop an interest in their own learning which shall carry itself forward throughout their education.
             <br></br>
             <br></br>
             Our goal at Shooting Stars is to facilitate the development of these foundations, while ensuring that students embrace their learning instead of shunning it. We offer interactive, flexible courses online to help our students achieve just that – in the manner and with the teachers they find most comfortable.
             </p>
         </div>
         </div>
         </div>
         <div className="page_sidebar">
           <Sidebar/>
         </div>
      </Container>
      <HomeFooter/>
    <SignInPopup/>
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
  .image_container {
    width: 65vw;
    height: 60vh;
    min-height: fit-content;
    background-image: url("https://shootingstareducation.com/assets/img/courses/primary_2_848x500.jpg");
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

  .page_sidebar{
      width : 30vw;
      margin-left : 40px;
    }

  .secondBar{
    margin-top : 20px !important;
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
        height : fit-content;
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

export default PrimaryEducation;
