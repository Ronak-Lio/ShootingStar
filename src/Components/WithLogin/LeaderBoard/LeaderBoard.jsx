import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderMain from "../Header/HeaderMain";
import "./LeaderBoard.css";
import LeaderBoardNumber from "./LeaderBoardNumber";
import LeaderSecHead from "./LeaderSecHead";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { useHistory } from "react-router";
import { useStateValue } from "../../../StateProvider";
import db from "../../../firebase";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Button from '@mui/material/Button';
import { Stack } from "react-bootstrap";
import HeaderTeacher from '../Teacher/HeaderTeacher/HeaderTeacher' 

function LeaderBoard() {
  const[{signInAs,user, teacherSubjectId, teacherCourseId} , dispatch] = useStateValue();
  const [leaders,setLeaders]=useState([]);
  const [leaderName,setLeaderName]=useState('');
  const [addName,setAddName]=useState(false);
  const [marks,setMarks]=useState('');
  var today=new Date();
    const history=useHistory();
    const [showdate,setShowdate]=useState(false);
    const [date,setDate]=useState(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate())
    var dateC=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    useEffect(()=>{
      if(signInAs?.currentCourseID && signInAs?.currentSubjectID){
        console.log("object///////s");
        db.collection('Courses').doc(signInAs?.currentCourseID).collection('Subjects').doc(signInAs?.currentSubjectID).collection('students')
        // .orderBy('marks','asc')
        .onSnapshot((snapshot)=>(
          setLeaders(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        ))
      }
    },[signInAs?.currentSubjectID]);

const addInLeaderBoard=()=>{
  if(teacherCourseId && teacherSubjectId ){
    db.collection('Course').doc(teacherCourseId).collection('Subjects').doc(teacherSubjectId).collection("LeaderBoard").add({
      name:leaderName,
    })
    setLeaderName('')
  }else{
    alert("try again")
  }
}
console.log(leaders);

  return (
    <div className="LeaderBoard">
      {addName && (
          <div className="popupDelete">
            <div className="popupDeleteIn">
              <div className="popupDeleteIntop">
                <div className="name">Add Notice</div>
                <div
                  className="Backicon"
                  onClick={() =>  setAddName(!addName)}
                >
                  {/* <ClearRoundedIcon className="Backiconi" /> */}
                  <div className="Backiconi">
                    x
                  </div>
                </div>
              </div>
              <div className="popupbody">
                <input
                  placeholder="Notice "
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                />
                <div className="btn">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={addInLeaderBoard}>Add</Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        )}
      <div className="leaderboardHeader">
     { signInAs?.value==="student" ? <HeaderMain />:<HeaderTeacher/>}
      </div>
      <div className="LeaderBoard__Header">
      </div>
      <div className="leaderboard__Body">
        <div className="leaderboard__body__In">
          <div className="leaderboard__body__In__Header">
              <div className="leadeaboard__body__Header__back">
               <ArrowBackRoundedIcon onClick={()=>
                  history.push('/main')
               }/>
              </div>
              <div className="leaderboard__body__Header__text">
              LeaderBoard
              </div>
          </div>
          <div className="leaderboard__body__In__head_head">
            {/* <input type="date" id="start" name="trip-start"
       value={date} onChange={e=>setDate(e.target.value)}
       min="2021-10-08" max={dateC} /> */}
       Latest
          </div>
          <LeaderSecHead />
          <Divider />
          <div className="leaderboard__body__In__Body">
             
          {leaders.map((leader,serial) => (
          <LeaderBoardNumber leader={leader} serial={serial}/>
              ))}
          </div>
         <div className="scroll">
         Scroll down to see more
         </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
