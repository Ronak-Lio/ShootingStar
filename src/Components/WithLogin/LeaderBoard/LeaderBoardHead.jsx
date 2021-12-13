import { Divider } from '@mui/material';
import React from 'react';
import './LeaderBoardNumber.css';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useStateValue } from '../../../StateProvider';

function LeaderBoardNumber() {
     
    return (
        <>
        <div className="LeaderBoardNumber">
            <div className="LeadearBoardNumber__First">
                <div className="Serial__Num">
                  {"Sn. "}
                </div>
                <div className="leader__Num">
                   {" Names"}
                </div> 
                {/* <div className="editLeaderboard" >
              {leader?.data?.name}
            </div>  */}
            </div>
            <div className="LeaderBoardNumber__Sec"> 
           {"Marks"}
            </div>
        </div>
    <Divider/>
    </>
    )
}

export default LeaderBoardNumber
