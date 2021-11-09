import React from 'react';
import './HomeFooter.css';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

function HomeFooter() {
    return (
        <>
            <div className="homefooter">
                <div className="homefooterin">
                    <div className="footdiv">
                        <div className="footdivHead">
                            SHOOTING STARS
                        </div>
                        <div className="footdivBody">
                            We stress on the importance of learning SMART, by working hard to find how, and in what way, you learn best, what works for you, playing to your strengths, and working on your weaknesses, so that you become the best student you can be.
                        </div>
                    </div>
                    <div className="footdiv">
                        <div className="footdivHead">
                            QUICK LINKS
                        </div>
                        <div className="footdivhead_link">
                        <KeyboardArrowRightRoundedIcon/>  {"Home"}
                        </div>
                        <div className="footdivhead_link">
                        <KeyboardArrowRightRoundedIcon/> {"About Us"}
                        </div>
                        <div className="footdivhead_link">
                        <KeyboardArrowRightRoundedIcon/> {"Contact Us"}
                        </div>
                        <div className="footdivhead_link"><KeyboardArrowRightRoundedIcon/> {"Course Archive"}
                        </div>
                    </div>
                    <div className="footdiv">
                        <div className="footdivHead">
                            POPULAR COURSES
                        </div>
                        <div className="footdivhead_link">
                        <KeyboardArrowRightRoundedIcon/>  {"Primary Education"}
                        </div>
                        <div className="footdivhead_link">
                        <KeyboardArrowRightRoundedIcon/> {"Secondary Education"}
                        </div>
                        <div className="footdivhead_link">
                        <KeyboardArrowRightRoundedIcon/> {"NEET"}
                        </div>
                        <div className="footdivhead_link">
                        <KeyboardArrowRightRoundedIcon/>{"Languages"}
                        </div>
                    </div>
                    <div className="footdiv">
                        <div className="footdivHead">
                            CONTACT
                        </div>
                       <div className="footdivbody">
                       <div className="footdivHeademail">
                            <div className="footdivHeademailfirp">
                                Phone
                            </div>
                            <div className="footdivHeademailsec">
                                +971 56 264 4049 <br></br>
                                +91 935 495 5506
                            </div>
                        </div>
                        <div className="footdivHeademail">
                            <div className="footdivHeademailfire">
                                Email
                            </div>
                            <div className="footdivHeademailsec">
                                info@shootingstareducation.com
                            </div>
                        </div>
                        <div className="footdivHeademail">
                        <div className="footdivHeademailfira">
                                Address
                            </div>
                            <div className="footdivHeademailsec">
                            Office 101,SHK Zayed Building, Next to Business Bay Metro Station Exit 2,Business Bay, Sheikh Zayed Road, Dubai, UAE
                            P O BOX IS 32925
                            </div>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeFooter;
