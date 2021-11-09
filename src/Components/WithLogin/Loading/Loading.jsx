import React from 'react';
import styled from "styled-components";
import { CircularProgress } from '@mui/material';



function Loading() {
    return (
        <>
         <Container>
              <div className="circular_icon">
              <CircularProgress/>
              </div>
         </Container>
        </>
    )
};

const Container  = styled.div`
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  width : inherit;
  height : inherit; 

  .circular_icon{
      margin: auto;
  }
`;


export default Loading
