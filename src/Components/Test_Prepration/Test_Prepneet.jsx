import React, { useState } from 'react';
import './Test_Prepneet.css';
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Divider } from '@mui/material';
import Sidebar from './Sidebar';
import HomeFooter from '../Home/HomeFooter';
import Title from '../Courses/CourseArchieve/Title';
import Header from '../Header/Header';

function Test_Prepneet() {
    return (
        <div className="Test_Prepneet">
          <Header/>
            <div className="contact">
            <Title title={"NEET"}/>
      <div className="contact_body">
        <div className="contact_body1">
          <div className="Form_N">
            <div className="Form_neetImg">
                <img src="/img/neet (1).jpg" alt="" />
            </div>
            <div className="Form_BODY">
                <h3>NEET</h3>
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
                    Aim comes from Ambition and being ambitious is your true self. Here at Shooting Stars, we train you and help you reach a level where you can achieve your future goals. We train you to be eligible to appear for the National Eligibility Entrance Test (NEET) and clear the same with the highest scores.
                    </p>
                    <p>
                    NEET was formerly known as the All India Pre-Medical Test (AIPMT). It is the qualifying examination for MBBS and BDS programmes in Indian medical and dental colleges and is conducted in May every year. The limited seats, compared to the large student body that attempts the examination every year has made this entrance exam highly competitive.
                    </p>
                    <p>
                    What we offer:
                    </p>
                    <p>
                    Our NEET-Prep Course is expertly designed to help students achieve the best they can, so that they can qualify for application in the colleges of their choice.
                    </p>
                    <p>
                    The course is designed to allow students adequate time for revision and testing before the exam, laying equal emphasis on not only communication of academic material between the student and teacher, but also regular evaluation and maintaining student motivation before the test.
                    </p>
                    <p>
                    Our course shall begin at the CBSE Board Level. This is because - before NTA, which is an independent testing organisation, NEET was conducted by the Central Board of Secondary Education (CBSE). Hence we aim to establish strong foundations of the basics from the Board level before moving into the entrance exam syllabus.
                    </p>
                    <p>
                    The course offers flexible timings and duration based on the students’ level of preparation and understanding, one-to-one or group classes for teaching, revision, and testing, along with doubt clearance classes as per students’ convenience.
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
                    Biology
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

export default Test_Prepneet
