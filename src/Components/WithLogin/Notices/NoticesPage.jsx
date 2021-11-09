import React from 'react';
import styled from "styled-components"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Notice from './Notice';
import {useHistory} from "react-router-dom"

function NoticesPage() {
    const history = useHistory();
    const back_to_previous_page = () => {
      history.goBack();
    }
    
    return (
      <>
       <Container>
        <div className="notice_page_header">
         <ArrowBackIcon onClick = {back_to_previous_page}/>
         <p>Notices</p>
        </div>
        <div className="notice_page_notices">
           <Notice/>
           <Notice/>
           <Notice/>
           <Notice/>
           <Notice/>
        </div>
       </Container>
      </>
    )
};

const Container  = styled.div`
width: 100vw;
height: 100vh;
display : flex;
flex-direction: column;
.notice_page_header {
    display : flex;
    justify-content : space-between;
    border-bottom: 1px solid lightgray;
    padding : 10px;
    p{
        width :100%;
        text-align : center;
        margin-bottom : 0px;
        font-size : 18px;
    }
}

.notice_page_notices{
    padding: 15px;
    overflow-y : scroll
}
`;



export default NoticesPage
