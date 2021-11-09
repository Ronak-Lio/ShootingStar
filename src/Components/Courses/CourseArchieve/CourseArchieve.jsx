import React from 'react'
import Header from '../../Header/Header'
import "./CourseArchieve.css"
import InfoBox from './InfoBox'
import HomeFooter from "../../Home/HomeFooter"
import Sidebar from "../../Sidebar/Sidebar"
import Title from "./Title"

function CourseArchieve() {
    return (
        <div className = 'courseArchieve'>
          <Header/>
           <Title title = "Course Archieve"/>
           <div className = "middle_container">
           <div className="main_content">
             <InfoBox name = "Primary Education" text = "Being the first stage of formal education, Primary Education is the first step in helping children to fall in love with learning and ensuring that their academic" photoUrl = "https://shootingstareducation.com/assets/img/courses/primary_2_848x500.jpg"/>
             <InfoBox name = "Secondary Education" text = "Secondary Education might just be the most essential part of a student’s journey at school. Along with slowly discovering who they are as people" photoUrl = "https://shootingstareducation.com/assets/img/courses/secondary_848x500.jpg"/>
            
             <InfoBox name = "Higher Secondary Education" text = "Higher secondary education might just be the turning point of students' lives. It is during these 4 crucial years that students pick their preferred streams upon their" photoUrl = "https://shootingstareducation.com/assets/img/courses/highersecondary.jpg"/>
             <InfoBox name = "NEET" text = "Aim comes from Ambition and being ambitious is your true self. Here at Shooting Stars, we train you and help you reach a level where you" photoUrl = "https://shootingstareducation.com/assets/img/courses/neet.jpg"/>
             <InfoBox name="JEE MAIN AND ADVANCED" text = "Aim comes from Ambition and being ambitious is your true self. Here at Shooting Stars, we train you and help you reach a level where you" photoUrl = "https://shootingstareducation.com/assets/img/courses/jee-adv.jpg"/>
             <InfoBox name="Languages" text = "Learning a new language opens multiple doors and carries its own compelling advantages. A quick Google search on "
             photoUrl = "https://shootingstareducation.com/assets/img/courses/languages.jpg"
             />
             <InfoBox name="IELTS" text = "The International English Language Testing System (IELTS) measures the language proficiency of people who want to study or " photoUrl = "https://shootingstareducation.com/assets/img/courses/ielts1.jpg"/>

           </div>
           <div className="page_sidebar">
             <Sidebar/>
           </div>
           </div>
     <HomeFooter/>
        </div>
    )
}

export default CourseArchieve
