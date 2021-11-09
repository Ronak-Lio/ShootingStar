import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

function NotificationCom() {
  return (
    <div className="NotificationCom">
      <div className="NotificationComIn">
        <div className="Notification_Zero">
          <div className="Notification_Zero_Course">Physics</div>
          <div className="Notification_Zero_Course_T">
            {" - "} ABHAYNANAD SIR
          </div>
        </div>
        <div className="Notification__first">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          ullam, sit consectetur autem, alias tempora dolorem dicta aperiam
          architecto dolore magnam voluptatibus. Velit, numquam quod accusantium
          dicta nihil voluptatem ipsa!
        </div>
        <div className="notification__Second">
          <div className="notification__second__first">
            <h6>23-12-2302</h6>
            <h6>9:60</h6>
          </div>
          <div className="notification__second__sec">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationCom;
