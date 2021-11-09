import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { Link, useHistory } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
function HeaderSidebar() {
  const history = useHistory();
  const [openTestNames, setOpenTestNames] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);

  useEffect(() => {}, [openTestNames], [openCourses]);
  const closeSidebar = () => {
    history.goBack();
  };

  const openTestOptions = () => {
    if (openTestNames === false) {
      setOpenTestNames(true);
    } else {
      setOpenTestNames(false);
    }
  };

  const openCourseOptions = () => {
    if (openCourses === false) {
      setOpenCourses(true);
    } else {
      setOpenCourses(false);
    }
  };
  return (
    <div className="headerSidebar">
      <Container>
        <div className="container_header">
          <div className="image_container">
            <img src="img/ShootingStarLogo.png" alt="No" />
          </div>
          <CloseIcon className="close_icon" onClick={closeSidebar} />
        </div>
        <div className="header_options">
          <Link>
            <p className="header_option">Home</p>
          </Link>
          <div className="option" onClick={openTestOptions}>
            <p className="header_option">Test Preparation</p>
            {openTestNames === false ? (
              <ArrowDropDownIcon className="arrowDown_Icon" />
            ) : (
              <ArrowDropUpIcon className="arrowDown_Icon" />
            )}
          </div>
          {openTestNames === true && (
            <div className="test_subOptions">
              <Link to = "/test preparation sat">
                {" "}
                <p className="subOption">SAT</p>
              </Link>
              <Link to = "/test preparation neet">
                {" "}
                <p className="subOption">NEET</p>{" "}
              </Link>
              <Link to = "/test preparation jee">
                <p className="subOption">IIT JEE ADVANCED</p>
              </Link>
              <Link to = "test preparation ielts">
                {" "}
                <p className="subOption">IELTS</p>
              </Link>
            </div>
          )}
          <div className="option" onClick={openCourseOptions}>
            <p className="header_option">Courses</p>
            {openCourses === false ? (
              <ArrowDropDownIcon className="arrowDown_Icon" />
            ) : (
              <ArrowDropUpIcon className="arrowDown_Icon" />
            )}
          </div>
          {openCourses === true && (
            <div className="test_subOptions">
              <Link to="/courseArchieve">
                <p className="subOption">Course Archieve</p>
              </Link>
              <Link to="/primaryEducation">
                <p className="subOption">Primary Education</p>
              </Link>
              <Link to="/secondaryEducation">
                <p className="subOption">Secondary Education</p>
              </Link>
              <Link to="/higherSecondaryEducation">
                <p className="subOption">Higher Secondary Education</p>
              </Link>
              <Link to="/languages">
                <p className="subOption">Languages</p>
              </Link>
            </div>
          )}
          <Link>
            <p className="header_option">Contact</p>
          </Link>
        </div>
        <button className="sidebar_button">Sign In</button>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  .container_header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
  }
  .image_container {
    display: flex;
    img {
      height: 50px;
      margin-top: 5px;
    }
  }

  .close_icon {
    margin-top: 10px;
    font-size: 35px;
    margin-right: 10px;
  }

  .header_options {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-top: 10px;
    a {
      text-decoration: none;
      color: black;
    }
  }

  .header_option {
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .option {
    display: flex;
    justify-content: space-between;
  }

  .arrowDown_Icon {
    font-size: 30px !important;
    margin-top: 10px;
  }

  .sidebar_button {
    background-color: #bdd8ee;
    border-radius: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    /* color : white; */
    height: 40px;
  }

  .test_subOptions {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    /* border-top : 1px solid lightgray; */
    p {
      font-size: 17px;
    }

    a {
      text-decoration: none;
      color: black;
    }
  }
`;

export default HeaderSidebar;
