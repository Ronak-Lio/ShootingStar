import { Divider } from '@mui/material';
import React from 'react';
import './LeaderBoardNumber.css';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useStateValue } from '../../../StateProvider';

function LeaderBoardNumber({leader,serial}) {
    const[{signInAs} , dispatch] = useStateValue();
     
    return (
        <>
        <div className="LeaderBoardNumber">
            <div className="LeadearBoardNumber__First">
                <div className="Serial__Num">
                  {serial+1}.
                </div>
                <div className="leader__Fotu">
                   {leader && leader?.data?.name[0]}
                </div> 
                <div className="editLeaderboard" >
              {leader?.data?.name}
            </div> 
            </div>
            <div className="LeaderBoardNumber__Sec"> 
           {leader?.data && leader?.data?.marks==='-1' ? '-':leader?.data?.marks}
            </div>
        </div>
    <Divider/>
    </>
    )
}

export default LeaderBoardNumber
