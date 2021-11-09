import React from 'react';
import Chat from '../../Chat/Chat';
import ChatTeacher from '../ChatTeacher/ChatTeacher';
import HeaderTeacher from '../HeaderTeacher/HeaderTeacher';
import NoticesTeacher from '../Notice/NoticesTeacher';
import './MainTeacher.css';

function MainTeacher() { 
    return (
        <div className="mainteacher">
          <HeaderTeacher/>
          <div className="mainBody">
                <div className="mainBodyIN">
                <div id="chat">
                <ChatTeacher />
                </div>
                <div id="noti">
                <NoticesTeacher/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default MainTeacher;
