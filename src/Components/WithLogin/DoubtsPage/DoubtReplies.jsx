import React from 'react'
import styled from "styled-components"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Reply from './Reply';
import {useStateValue} from "../../../StateProvider"
import {actionTypes} from "../../../reducer"

function DoubtReplies() {
    const[{ openDoubtReplies} , dispatch] = useStateValue();
    const close_doubt_replies = (e) => {
        e.preventDefault();
        dispatch({
            type : actionTypes.OPEN_DOUBT_REPLIES,
            openDoubtReplies: false
        })
    }
    return (
        <>
          <Container>
              <div className="doubtReplies_header">
                 <div className="icon_cicle">
                  <ArrowBackIcon onClick = {close_doubt_replies}/>
                 </div>
              </div>
              <div className="doubtReplies_replies">
                 <Reply />
                 <Reply />
                 <Reply />
              </div>
          </Container>   
        </>
    )
};

const Container  = styled.div`
 flex : 1;
 display : flex;
 flex-direction : row;
 /* background-color : #eeeded; */
 background-color : #5094ee;
 overflow-y : scroll;
  .doubtReplies_header{
      padding-left: 5px;
      padding-top : 5px;
      width : fit-content;
      height : fit-content
  }

  .icon_cicle{
      background-color : white;
      width : fit-content;
      border-radius : 50%;
      padding : 5px;
      border : 1px solid gray;
      &:hover{
          cursor : pointer;
          background-color : lightgray;
      }
  };

  .doubtReplies_replies{
      width : 100%;
  }
`;

export default DoubtReplies
