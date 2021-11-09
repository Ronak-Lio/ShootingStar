import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import SignInPopup from "./SigInPopup";
import { auth } from "../../firebase";

function Header() {
  const history = useHistory();
  const [{ openSignInPopup }, dispatch] = useStateValue();
  const openSidebar = () => {
    history.push("/headerSidebar");
  };

  const OpenSignInPopup = (e) => {
    e.preventDefault();
    history.push("/signIn");
  };
  return (
    <div className="header">
      <div className="icons">
        <DehazeIcon className="sidebar_icon" onClick={openSidebar} />
        <img className="logo" src="img/Star_logo.png" alt="No" />
        <img className="mobile_logo" src="img/ShootingStarLogo.png" alt="No" />
      </div>
      <div className="links">
        <Link to="/">
          <p className="link_para">Home</p>
        </Link>
        <TestNames className="test_names">
          <p className="link_para test_preparation">Test Preparation</p>
          <div className="names">
            {/* <Link to="/test preparation sat"> */}
              {" "}
              <p className="suboption sat" onClick={()=>{auth.signOut()}}>SAT</p>
            {/* </Link> */}
            <Link to="/test preparation neet">
              {" "}
              <p className="suboption">NEET</p>{" "}
            </Link>
            <Link to="/test preparation ielts">
              {" "}
              <p className="suboption">IELTS</p>
            </Link>
            <Link to="/test preparation jee">
              <p className="suboption">IIT JEE ADVANCED</p>
            </Link>
          </div>
        </TestNames>
        <TestNames className="test_names">
          <p className="link_para test_preparation">Courses</p>
          <div className="names">
            <Link to="/courseArchieve">
              {" "}
              <p className="suboption sat">Course Archieve</p>
            </Link>
            <Link to="/primaryEducation">
              {" "}
              <p className="suboption">Primary Education</p>{" "}
            </Link>
            <Link to="/secondaryEducation">
              <p className="suboption">Secondary Education</p>
            </Link>
            <Link to="/higherSecondaryEducation">
              {" "}
              <p className="suboption">Higher Secondary Education</p>
            </Link>
            <Link to="/languages">
              {" "}
              <p className="suboption">Languages</p>
            </Link>
          </div>
        </TestNames>
        <Link>
          <p className="link_para">Contact</p>
        </Link>
      </div>
      <button onClick={OpenSignInPopup}>Sign In</button>
    </div>
  );
}

const TestNames = styled.div`
  .names {
    display: none;
    flex-direction: column;
    z-index: 999;
    margin-top: 50px;
    background-color: #fff;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-top: 5px solid #2370e2;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.12);

    .suboption {
      padding-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 5px;
      margin-bottom: 0px;
      margin-top: 15px;
      &:hover {
        background-color: #2ebeee;
        color: white;
      }
    }

    .sat {
      margin-top: 0px !important;
    }
  }
  &:hover {
    cursor: pointer;
    color: blue;
    .names {
      display: flex;
      position: absolute;
    }
  }
`;

export default Header;
