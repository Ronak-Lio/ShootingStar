import React from 'react';
import './UserSummary.css'

function UserSummary({user,student,teacher,admin}) {
    return (
        <>
        <div className="userSummary">
            <div className="userSummary__header">
             <div className="userSummary__Header__text">
                 Total User
             </div> 
             <div className="userSummary__Header__js">
                 {user}
             </div> 
            </div>

            <div className="userSummary__body">
            <div className="body__student">
            <div className="userSummary__Header__textBody">
                 Total Student
             </div>
             
             <div className="userSummary__Header__jsBody">
                 {student}
             </div>
            </div>
            <div className="body__teacher">
            <div className="userSummary__Header__textBody">
                 Total Teacher
             </div>
             
             <div className="userSummary__Header__jsBody">
                 {teacher}
             </div>
            </div>
            <div className="body__admin">
            <div className="userSummary__Header__textBody">
                 Total Admin
             </div>
             
             <div className="userSummary__Header__jsBody">
                {admin}
             </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default UserSummary
