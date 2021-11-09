import { Divider } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';
import HomeFooter from '../Home/HomeFooter'
import Title from '../Courses/CourseArchieve/Title';
import Header from '../Header/Header';

function Test_Prepielts() {
    return (
        <div className="Test_Prepneet">
           <Header/>
        <div className="contact">
  <Title title={"IELTS"}/>

  <div className="contact_body">
    <div className="contact_body1">
      <div className="Form_N">
        <div className="Form_neetImg">
            <img src="/img/ielts.jpg" alt="" />
        </div>
        <div className="Form_BODY">
            <h3>IELTS</h3>
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
                  1 to 5
                  </h6>
                  <h6>
                  36 hours
                  </h6>
                  <h6>
                  one on one, group of 3-4
                  </h6>
                  <h6>
                  Through out the year
                  </h6>
                </div>
            </div>
            <h4>Description</h4>
            <Divider/>
            <div className="Neet_Des">
                <p>
                The International English Language Testing System (IELTS) measures the language proficiency of people who want to study or work where English is used as a language of communication.
                </p>
                <p>
                To help you apply for higher education or professional registration for Academics, as well as for General Training if you choose to fly to Australia, Canada and the UK, or apply for secondary education, training programmes and work experience in an English-speaking environment, we are here to guide you completely in order to appear and score the highest band in the IELTS exam.
                </p>
                <p>
                IELTS is available at more than 1,600 locations worldwide, including more than 50 locations in the USA will not only be a challenge but also an opportunity to bring the best out of your knowledge of the four modules IELTS provides. We prepare you for your test with a range of free IELTS study materials and resources from the British Council as well as from our own sources. Our IELTS learning material will get you acquainted with the test format and also improve your confidence in writing, speaking, reading and listening in English.
                </p>
                <p>
                How will our IELTS-Prep Course help you score the best?
                </p>
                <p >
                We provide:
                </p>
            </div>
        </div>
      </div>
      <div className="secondBarTEST">
      <div className="secondBar">
      <div className="secondBar_Head">Popular Course</div>
        <div className="secondBar_List">
            <div className="sub_Name">
            English
            </div>
            <div className="sub_Name">
            Hindi
            </div>
            <div className="sub_Name">
            Maths
            </div>
            <div className="sub_Name">
            French
            </div>
            <div className="sub_Name">
            Science
            </div>
            <div className="sub_Name">
            Social Studies
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

export default Test_Prepielts
