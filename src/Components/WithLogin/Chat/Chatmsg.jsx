import React from 'react'

function Chatmsg({message}) {
    return ( 
            <div className="chat__message__my">
              <h6>{message.data?.sendby && message.data?.sendby}</h6>
              <div className="chat__message_div">
              <h5>
                 {message.data?.message}
              </h5>
              <p>{message.data?.date}</p>
              </div>
              </div>
    )
}

export default Chatmsg;
