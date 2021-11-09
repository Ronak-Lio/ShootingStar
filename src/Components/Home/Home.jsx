import React from 'react';
import Courses from './Courses';
import ExpTeacher from './ExpTeacher';
import './Home.css'
import HomeFooter from './HomeFooter.jsx';
import HomeMiddle from './HomeMiddle.jsx';
import HomeTop from './HomeTop.jsx';
import Header from "../Header/Header"
import LastSlider from './LastSlider';

function Home() {
    return (
        <>
            <div className="home">
                <Header/>
                <HomeTop/>
                <HomeMiddle/>
                {/* <Courses/> */}
                <ExpTeacher/>
                {/* <LastSlider/> */}
            <HomeFooter/>
            </div>
        </>
    )
}

export default Home;
