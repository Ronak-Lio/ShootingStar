import React from 'react'
import styled from "styled-components"
import CloseIcon from '@mui/icons-material/Close'
import CancelIcon from '@mui/icons-material/Cancel';

function Notice({notice}) {
    return (
        <>
         <Container>
            <div className="close_notice">
                <CancelIcon className="close_icon"/>
            </div>
           <p className="notice">
           {notice.data?.notice}  
           </p>
           <p className="sent_by">{notice.data?.teacher}</p>  
         </Container>
        </>
    )
};

const Container  = styled.div`
background-color: #fff;
 padding: 10px;
 border-radius : 10px;
 margin-bottom : 15px;
 border : 1px solid lightgray;
 display : flex;
 flex-direction: column;

 .close_notice{
     display : flex;
     justify-content : flex-end;
 }

 .close_icon{
     font-size : 19px;
     &:hover{
         cursor : pointer;
         color : #6d6969;
     }
 }

 .notice{
   font-size : 15px;
   margin-bottom : 0px;
 }

 .sent_by{
     text-align: right;
     margin-bottom : 0px;
     font-size : 15px;
 }
`;

export default Notice
