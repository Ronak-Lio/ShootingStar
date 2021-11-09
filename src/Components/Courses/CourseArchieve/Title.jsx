import React from 'react'
import "./Title.css"

function Title({title}) {
    return (
        <div className="title">
              <p className="page_title">
                  {title}
              </p>
        </div>
    )
}

export default Title
