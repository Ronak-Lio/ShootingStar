import React from 'react';
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="secondBar">
        <div className="secondBar_Head">Popular Course</div>
        <div className="secondBar_List">
          <div className="List_COntact">
            <div className="list_img">
              <img src="/img/neet.jpg" alt="" />
            </div>
            <div className="list_text">NEET</div>
          </div>
          <div className="List_COntact">
            <div className="list_img">
              <img src="/img/jee-adv.jpg" alt="" />
            </div>
            <div className="list_text">JEE</div>
          </div>
          <div className="List_COntact">
            <div className="list_img">
              <img src="/img/ielts1.jpg" alt="" />
            </div>
            <div className="list_text">IELTS</div>
          </div>
          <div className="List_COntact">
            <div className="list_img">
              <img src="/img/primary.jpg" alt="" />
            </div>
            <div className="list_text">Primary Education</div>
          </div>
          <div className="List_COntact">
            <div className="list_img">
              <img src="/img/secondary.jpg" alt="" />
            </div>
            <div className="list_text">Secondary Education</div>
          </div>
          <div className="List_COntact">
            <div className="list_img">
              <img src="/img/highersecondary.jpg" alt="" />
            </div>
            <div className="list_text">Higher Secondary Education</div>
          </div>
          <div className="List_COntact">
            <div className="list_img">
              <img src="/img/languages.jpg" alt="" />
            </div>
            <div className="list_text">Languages</div>
          </div>
        </div>
      </div>
    )
}

export default Sidebar
