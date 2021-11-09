import React from "react";
import "./Contact.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function Contact() {
  return (
    <div className="contact">
      <div className="contact_header">
        <div className="header_head">Contact</div>
        <div className="header_body">
            <div className="header_body_home">
                Home /
            </div>
            <div className="header_body_contact">
                Contact
            </div>
        </div>

      </div>
      <div className="contact_body">
        <div className="contact_body1">
          <div className="Form">
            <div className="Form_head">Enquiry Form</div>
            <div className="Form_head_first">
              <div className="Form_head_first_f">
                <div className="Form_head_first_f_Name">Name</div>
                <input type="text" />
              </div>
              <div className="Form_head_first_f">
                <div className="Form_head_first_f_Name">Phone Number</div>
                <input type="text" />
              </div>
            </div>
            <div className="Form_head_first">
              <div className="Form_head_first_f">
                <div className="Form_head_first_f_Name">Email ID</div>
                <input type="text" />
              </div>
              <div className="Form_head_first_f">
                <div className="Form_head_first_f_Name">Location</div>
                <input type="text" />
              </div>
            </div>
            <div className="Form_head_Last">
              <div className="Form_Description">
                <div className="Form_head_first_f_Name">Description</div>
                <div className="Form_Description_Name">
                  <textarea />
                </div>
              </div>
            </div>
            <div className="Form_button">
              <Button variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default Contact;
