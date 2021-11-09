import React from 'react'
import styled from "styled-components"

function Reply() {
    return (
       <>
        <Container>
        <div className="reply">
          <div className="reply_name">
            <p>Ronak</p>
          </div>
          <div className="reply_message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
        </Container>
       </>
    )
};

const Container  = styled.div`
   .reply{
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-left: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 300px;
  }

  .reply_message {
    position: relative;
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    p {
      font-size: 12px;
      padding: 10px;
      margin-bottom: 0px;
      padding-bottom: 4px !important;
    }
  }

  .reply_name {
    p {
      font-weight: 700;
      font-size: xx-small;
      font-style: italic;
      margin-bottom: 2px;
      margin-top: 0px;
      padding: 0px;
      margin-left: 5px;
    }
  }
`;

export default Reply
