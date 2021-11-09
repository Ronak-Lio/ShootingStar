import React from 'react'
import styled from "styled-components"
import {useStateValue} from "../../../StateProvider"
import Notice from './Notice'
import CloseIcon from "@mui/icons-material/Close"
import {actionTypes} from "../../../reducer"


function NoticePopup() {
    const[{openNoticesPopup} , dispatch] = useStateValue();

    const close_notices_popup = () => {
        dispatch({
            type : actionTypes.OPEN_NOTICES_POPUP,
            openNoticesPopup : false,
        })
    }
    return (
       <>
        {openNoticesPopup === true && (
            <Container>
             <div className="all_notices">
              <div className="all_notices_header">
                <p>Notices</p>
                 <CloseIcon className="close_icon" onClick =  {close_notices_popup}/>
              </div>
              <Notice/>
              <Notice/>
              <Notice/>
             </div>   
            </Container>   
        )}
       </>
    )
};

const Container = styled.div`
position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .all_notices{
    background-color: #fff;
    width: 450px;
    height: fit-content;
    max-height: 80vh;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
    overflow-y : scroll;
  }

  .all_notices_header{
      display: flex;
      justify-content : space-between;
      p{
          width: 100%;
          text-align: center;
          margin-bottom : 10px;
          font-size: 19px;
          font-weight:490;
      }
      .close_icon{
          font-size : 25px;
          &:hover{
          color : #6d6969;
          cursor: pointer;
      }
      }
  }

`;



export default NoticePopup
