import React from 'react'
import Header from '../../Header/Header';
import HeaderMain from '../Header/HeaderMain';
import './Notification.css';
import NotificationCom from './NotificationCom';

function Notification() {
    return (
        <div className="notification">
            <HeaderMain/>
           <NotificationCom/>
        </div>
    )
}

export default Notification;
