import { Divider } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';
import HomeFooter from '../Home/HomeFooter';
import Title from '../Courses/CourseArchieve/Title';
import Header from '../Header/Header';

function Test_PrepJee() {
    return (
        <div className="Test_Prepneet">
           <Header/>
            <div className="contact">
            <Title title={"JEE"}/>
      <div className="contact_body">
        <div className="contact_body1">
          <div className="Form_N">
            <div className="Form_neetImg">
                <img src="/img/jee-adv.jpg" alt="" />
            </div>
            <div className="Form_BODY">
                <h3>JEE MAIN and ADVANCED</h3>
                <h4>Course Information</h4>
                <Divider/>
                <div className="Neet_Info">
                    <div className="Neet_Info_1">
                     <h6>
                     Grade
                     </h6>
                     <h6>Course Duration</h6>
                     <h6>Batches</h6>
                     <h6>
                     Course Start
                     </h6>
                    </div>
                    <div className="Neet_Info_2">
                      <h6>
                      11 to 12
                      </h6>
                      <h6>
                      1-2 years
                      </h6>
                      <h6>
                      one on one, group of 3-4
                      </h6>
                      <h6>
                      April 1, 2021
                      </h6>
                    </div>
                </div>
                <h4>Description</h4>
                <Divider/>
                <div className="Neet_Des">
                    <p>
                    Aim comes from Ambition and being ambitious is your true self. Here at Shooting Stars, we train you and help you reach a level where you can achieve your future goals. We train you to be eligible to appear for the Joint Entrance Examination - Main and Advanced (JEE) and clear the same with the highest scores.                    </p>
                    <p>
                    JEE - Main and JEE - Advanced are qualifying examination held annually in India. The limited seats, compared to the large student body that attempts the examinations every year has made this entrance exam highly competitive.
                    </p>
                    <p>
                    What we offer:
                    </p>
                    <p>
                    Our JEE Main and Advanced-Prep Courses are expertly designed to help students achieve the best they can, so that they can qualify for application in the colleges of their choice.
                    </p>
                    <p>
                    The courses are designed to allow students adequate time for revision and testing before the exam, laying equal emphasis on not only communication of academic material between the student and teacher, but also regular evaluation and maintaining student motivation before the test.
                    </p>
                    <p>
                    Our courses shall begin at the CBSE Board Level. This is because - even though the examination is held under the guidance of the Joint Admission Board (JAB), the foundation of the exam syllabus lies in the syllabus of the Central Board of Secondary Education (CBSE). Hence we aim to establish strong foundations of the basics from the Board level before moving into the JEE-Advanced entrance exam syllabus.
                    </p>
                    <p>
                    The courses offer flexible timings and duration based on the students’ level of preparation and understanding, one-to-one or group classes for teaching, revision, and testing, along with doubt clearance classes as per students’ convenience.
                    </p>
                </div>
            </div>
          </div>
          <div className="secondBarTEST">
          <div className="secondBar">
          <div className="secondBar_Head">Popular Course</div>
            <div className="secondBar_List">
                <div className="sub_Name">
                    Physics
                </div>
                <div className="sub_Name">
                    Chemistry
                </div>
                <div className="sub_Name">
                Mathematics
                </div>
            </div>
            </div>
           <Sidebar/>
          </div>
        </div>
      </div>
    </div>
    <HomeFooter/>
        </div>
    )
}

export default Test_PrepJee;
