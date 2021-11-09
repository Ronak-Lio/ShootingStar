import React from "react";
import "./HomeMiddle.css";
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import LaptopMacRoundedIcon from '@mui/icons-material/LaptopMacRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import LaptopChromebookRoundedIcon from '@mui/icons-material/LaptopChromebookRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';

function HomeMiddle() {
    return (
        <>
            <div className="homemiddle">
                <div className="homemiddle_Top">
                    <div className="homemiddle_Top_Box1">
                        <div className="box1_svg">
                        <LaptopChromebookRoundedIcon fontSize="large"/>
                        </div>
                        <div className="box1_head">
                            Learn Online
                        </div>
                        <div className="box1_content">
                            Our online platform allows students to learn smart from the comfort of their homes, without the commuting time.
                        </div>
                    </div>
                    <div className="homemiddle_Top_Box2"> <div className="box1_svg">
                      <PersonOutlineRoundedIcon fontSize="large"/>
                    </div>
                        <div className="box1_head">
                            Expert Teachers
                        </div>
                        <div className="box1_content">
                            Our team of well-trained professionals are adaptable, flexible, and prepared to cater to all our students’ needs.
                        </div></div>
                    <div className="homemiddle_Top_Box3"> <div className="box1_svg">
                       <LightbulbRoundedIcon fontSize="large"/>
                    </div>
                        <div className="box1_head">
                            New Methods
                        </div>
                        <div className="box1_content">
                            We do away with the old give-out-content-in-a-lecture methods & replace them with interactive methods of teaching.
                        </div></div>
                </div>
                <div className="homemiddle_body">
                    <div className="homemiddle_body_N">
                        <div className="homemiddle_body_left">
                            <div className="homemiddle_body_left_head">ABOUT US</div>
                            <div className="homemiddle_body_left_b1">
                                In this ever-changing world, education has become less about
                                ‘knowing’ and more about ‘learning’. We at Shooting Stars
                                believe in the importance of learning. Moreover, we stress on
                                the importance of learning SMART, by working hard to find how,
                                and in what way, you learn best, what works for you, playing to
                                your strengths, and working on your weaknesses, so that you
                                become the best student you can be
                            </div>
                            <div className="homemiddle_body_left_b2">
                                So what are you waiting for? Click Here for your free demo class
                                now!
                            </div>
                            <div className="homemiddle_body_left_button">KNOW MORE</div>
                        </div>
                        <div className="homemiddle_body_right">
                            <img src="/img/about.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="homemiddle_body_feature">
                    <div className="homemiddle_body_featureNext">
                        <div className="homemiddle_body_featureHead">OUR FEATURES</div>
                        <div className="homemiddle_body_featuref">
                            Online learning from the comfort of their homes, professional
                            courses and expert teachers, flexible scheduling, along with
                            comprehensive study material and regular performance evaluations,
                            are what ensures that our students are equipped with all they need
                            to succeed.
                        </div>
                        <div className="homemiddle_body_featurel">
                            <div className="homemiddle_body_featurelf">
                                <div className="homemiddle_body_featureFirst">
                                    <TouchAppRoundedIcon fontSize="large"/>
                                </div>
                                <div className="homemiddle_body_featureSecond">
                                    Interactive Learning
                                </div>
                                <div className="homemiddle_body_featureSec"></div>
                                <div className="homemiddle_body_featureThird">
                                    1 to 1 classes and small groups of up to 3 students to ensure student-teacher interaction and increase student participation.
                                </div>
                            </div>
                            <div className="homemiddle_body_featurelf">


                                <div className="homemiddle_body_featureFirst">
                                    <LaptopMacRoundedIcon fontSize="large"/>
                                </div>
                                <div className="homemiddle_body_featureSecond">
                                Online Learning
                                </div>
                                <div className="homemiddle_body_featureSec"></div>
                                <div className="homemiddle_body_featureThird">
                                Students can learn from the comfort of their homes, saving them the time they spend on commuting, along with providing an environment they are comfortable in for the best learning experience.
                                </div>

                            </div>
                            <div className="homemiddle_body_featurelf">

                                <div className="homemiddle_body_featureFirst">
                                    <PersonRoundedIcon fontSize="large"/>
                                </div>
                                <div className="homemiddle_body_featureSecond">
                                Professional courses
                                </div>
                                <div className="homemiddle_body_featureSec"></div>
                                <div className="homemiddle_body_featureThird">
                                Our courses are expertly designed by well trained professional teachers to ensure that they cover the entire syllabus in a manner that allows each student to customize his or her learning.
                                </div>

                            </div>
                            <div className="homemiddle_body_featurelf">
                                <div className="homemiddle_body_featureFirst">
                                    <CalendarTodayRoundedIcon fontSize="large"/>
                                </div>
                                <div className="homemiddle_body_featureSecond">
                                Flexible Schedule
                                </div>
                                <div className="homemiddle_body_featureSec"></div>
                                <div className="homemiddle_body_featureThird">
                                Online classes from home and customizable courses make for a flexible schedule to ensure that students spend adequate time on their extra-curriculars, which is an integral aspect of their development.
                                </div>

                            </div>
                            <div className="homemiddle_body_featurelf">

                                <div className="homemiddle_body_featureFirst">
                                    <LibraryBooksRoundedIcon fontSize="large" />
                                </div>
                                <div className="homemiddle_body_featureSecond">
                                Comprehensive Study Material
                                </div>
                                <div className="homemiddle_body_featureSec"></div>
                                <div className="homemiddle_body_featureThird">
                                Our well thought out and carefully planned assignments and study material shall be constant companions for students to prepare and practice what has been covered by our courses.
                                </div>

                            </div>
                            <div className="homemiddle_body_featurelf">
                                <div className="homemiddle_body_featureFirst">
                                    <AutoGraphRoundedIcon fontSize="large" />
                                </div>
                                <div className="homemiddle_body_featureSecond">
                                Performance Evaluation
                                </div>
                                <div className="homemiddle_body_featureSec"></div>
                                <div className="homemiddle_body_featureThird">
                                Regular performance evaluation tests and assignments to ensure that the student is keeping up with the courses. Our faculty maintains a record of the student’s progress and monthly update emails are sent out to ensure that the student progress is being tracked.
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeMiddle;
