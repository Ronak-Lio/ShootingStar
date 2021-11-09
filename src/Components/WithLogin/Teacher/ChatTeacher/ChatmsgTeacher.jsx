import React from 'react'

function ChatmsgTeacher({message}) {
    return (
        // <div className="chatmsg">
            <div className="chatTeacher__message__my">
              <h6>{message.data?.sendby && message.data?.sendby}</h6>
              <div className="chatTeacher__message_div">
              <h5>
                 {message.data?.message}
              </h5>
              <p>{message.data?.date}</p>
              </div>
              </div>
        // </div>
    )
}

export default ChatmsgTeacher;
