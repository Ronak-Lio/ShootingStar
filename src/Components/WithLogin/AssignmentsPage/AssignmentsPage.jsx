import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./AssignmentsPage.css";
import Assignment from "./Assignment";
import { useStateValue } from "../../../StateProvider";
import AssignmentPopup from "./AssignmentPopup";
import Notices from "../Notices/Notices";
import { actionTypes } from "../../../reducer";
import NoticePopup from "../Notices/NoticePopup";
import { useHistory } from "react-router-dom";
import HeaderMain from "../Header/HeaderMain"

function AssignmentsPage() {
  const [{ openAsignmentPopup }, dispatch] = useStateValue();
  const history = useHistory();

  const open_noticesPopup = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.OPEN_NOTICES_POPUP,
      openNoticesPopup: true,
    });
  };

  const open_noticePage_for_mobile = (e) => {
    e.preventDefault();
    history.push("/noticesPage");
  };
  return (
    <div className="assignmentsPage">
     <HeaderMain/>
      <div className="upcoming_class_div">
        <p>Upcoming Class at 14:33 on Monday</p>
        <div className="upcoming_class_div_button">
          <button className="notices_for_ipad" onClick={open_noticesPopup}>
            Notices
          </button>
          <button
            className="notices_for_mobile"
            onClick={open_noticePage_for_mobile}
          >
            Notices
          </button>
        </div>
      </div>
      <Container>
        <Assignments>
          <p className="due_assignments">Due Assignments</p>
          <div className="due_assignments_div">
            <Assignment />
            <Assignment />
            <Assignment />
          </div>
          <p className="submitted_assignments">Submitted Assignments</p>
          <div className="submitted_assignments_div">
            <Assignment />
            <Assignment />
            <Assignment />
          </div>
        </Assignments>
        <div className="notices">
          <Notices />
        </div>
      </Container>
      <AssignmentPopup />
      <NoticePopup />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 10px;

  .notices {
    flex: 0.3;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-right : 30px;
  }

  @media (max-width: 1184px) {
    .notices {
      display: none;
    }
  }
`;

const Assignments = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;

  .due_assignments {
    text-align: center;
    font-size: 20px;
  }

  .due_assignments_div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    place-content: center;
  }

  .submitted_assignments_div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }

  .submitted_assignments {
    text-align: center;
    font-size: 20px;
  }

  @media (max-width: 1184px) {
    flex: 1;
    .notices {
      display: none;
    }
  }

  @media (max-width: 780px) {
    @media (min-width: 520px) {
      .due_assignments_div {
        flex-direction: column;
      }
    }
  }
`;

export default AssignmentsPage;
