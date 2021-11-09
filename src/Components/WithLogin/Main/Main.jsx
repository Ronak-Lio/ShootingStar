import React from 'react';
import './Main.css'
import Chat from '../Chat/Chat'
import HeaderMain from '../Header/HeaderMain';
import FirstNotices from '../FirstNotices/FirstNotices';

function Main() { 
    return (
        <div className="main">
            <HeaderMain/>
            {/* </div> */}
            <div className="mainBody">
                <div className="mainBodyIN">
                <div id="chat">
                <Chat />
                </div>
                <div id="noti">
                <FirstNotices/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Main
