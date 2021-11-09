import { Divider } from '@mui/material';
import React from 'react';
import './LeaderBoardNumber.css';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useStateValue } from '../../../StateProvider';

function LeaderBoardNumber({name}) {
    const[{signInAs,user, teacherSubjectId, teacherCourseId} , dispatch] = useStateValue();
    const editLeaders=()=>{
        // db.collection('Courses').doc(teacherCourseId).collection('Subjects').doc(teacherSubjectId).collection('leaderboard').update
      }
    return (
        // <>
        <div className="LeaderBoardNumber">
            <div className="LeadearBoardNumber__First">
                <div className="Serial__Num">
                  1
                </div>
                <div className="leader__Fotu">
                   {name && name[0]}
                </div>
                <div className="leader__Name">
                    {name?name:"Nishant Mainwal"}
                </div>
            </div>
            <div className="LeaderBoardNumber__Sec">
            <h6>
            {signInAs && signInAs.value=="teacher" && 
            <div className="editLeaderboard" onClick={editLeaders}>
              <EditRoundedIcon />
            </div>
            }
            </h6>
            </div>
    <Divider/>
        </div>
    // </>
    )
}

export default LeaderBoardNumber
