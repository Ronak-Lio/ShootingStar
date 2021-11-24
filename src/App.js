import "./App.css";
import Home from "./Components/Home/Home.jsx";
import HeaderSidebar from "./Components/HeaderSidebar/HeaderSidebar";
import CourseArchieve from "./Components/Courses/CourseArchieve/CourseArchieve";
import PrimaryEducation from "./Components/Courses/Primary Education/PrimaryEducation";
import SecondaryEducation from "./Components/Courses/Secondary Education/SecondaryEducation";
import HigherSecondaryEducation from "./Components/Courses/Higher Secondary Education/HigherSecondaryEducation";
import Languages from "./Components/Courses/Languages/Languages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
import Test_Prepsat from "./Components/Test_Prepration/Test_Prepsat";
import Test_Prepneet from "./Components/Test_Prepration/Test_Prepneet";
import Test_PrepJee from "./Components/Test_Prepration/Test_PrepJee";
import Test_Prepielts from "./Components/Test_Prepration/Test_Prepielts";
import Login from "./Components/Login/Login";
import AssignmentsPage from "./Components/WithLogin/AssignmentsPage/AssignmentsPage";
import NoticesPage from "./Components/WithLogin/Notices/NoticesPage";
import DoubtsPage from "./Components/WithLogin/DoubtsPage/DoubtsPage";
import Main from "./Components/WithLogin/Main/Main";
import Chat from "./Components/WithLogin/Chat/Chat";
import Profile from "./Components/WithLogin/Profile/Profile";
import LeaderBoard from "./Components/WithLogin/LeaderBoard/LeaderBoard";
import AssignmentsPageForTeacher from "./Components/WithLogin/Teacher/AssignmentsPage/AssignmentsPageForTeacher";
import DoubtsPageForTeacher from "./Components/WithLogin/Teacher/DoubtsPage/DoubtsPageForTeacher";
import MessagesSectionForMobile from "./Components/WithLogin/Teacher/DoubtsPage/MessagesSectionForMobile";
import MainTeacher from "./Components/WithLogin/Teacher/Main/MainTeacher";
import { actionTypes } from "./reducer";
import db, { auth } from "./firebase";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import SubmitAssignment from "./Components/WithLogin/AssignmentsPage/SubmitAssignment";
import UploadCorrectedAssignment from "./Components/WithLogin/Teacher/AssignmentsPage/UplaodCorrectedAssignment";
import UploadCreatedAssignment from "./Components/WithLogin/Teacher/AssignmentsPage/UploadCreatedAssignment";
import ChatTeacher from "./Components/WithLogin/Teacher/ChatTeacher/ChatTeacher";
import Admin from "./Components/WithLogin/Admin/Main/Main";
import AddTeacherInfo from "./Components/WithLogin/Admin/AddTeacher/AddTeacherInfo";
import ViewAssignmentPage from "./Components/WithLogin/Teacher/AssignmentsPage/ViewAssignmentPage";
import UpdatePage from "./Components/WithLogin/Profile/UpdatePage";
import CheckDocument from "./Components/WithLogin/Teacher/ChatTeacher/CheckDocument";
import ViewPdf from "./Components/WithLogin/ViewPdf/ViewPdf";
import Loading from "./Components/WithLogin/Loading/Loading";
import Courses from "./Components/WithLogin/Admin/Main/Courses";
import AddCourse from "./Components/WithLogin/Admin/AddCourse/AddCourse";
import AddCourseSubject from "./Components/WithLogin/Admin/AddCourse/AddCourseSubject";
import EditCourse from "./Components/WithLogin/Admin/AddCourse/EditCourses";
import NotificationPage from "./Components/WithLogin/Notifications/NotificationPage";
import NotificationsPageForTeacher from "./Components/WithLogin/Teacher/Notifications/NotificationsPageForTeacher";
import CreateProfile from "./Components/WithLogin/CreateProfile/CreateProfile";
import ResetPassword from "./Components/Login/ResetPassword";

function App() {
  const [{ signInAs, signInAsId, user, signInAsCourses }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        dispatch({
          type: actionTypes.SET_USER,
          user: auth,
        });
      } else {
      }
    });
  }, []);

  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SIGN_IN_AS,
            signInAs: snapshot.data(),
          })
        }
        );
    }
  }, [user?.uid]);
  useEffect(() => {
    if (user?.email) {
      db.collection('addByAdmin').where("email", "==", user?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("object", doc?.id)
            dispatch({
              type: actionTypes.SET_SIGN_IN_AS_ID,
              signInAsId: doc?.id,
            })
          })
        })
    }
  }, [user?.email])

  useEffect(() => {
    if (signInAsId)
      db.collection('addByAdmin').doc(signInAsId).collection('courses').onSnapshot((snapshot) => (
        dispatch({
          type: actionTypes.SET_COURSES_ARRAY,
          coursesArray: snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          })),
        })
      ))
  }, [signInAsId]);

  return (
    <Router>
      <Switch>
        <Route path="/chat">
          {signInAs ? (<>
            <div className="chat_Show">
              {signInAs && signInAs.value === "teacher" ? (
                <ChatTeacher />
              ) : (
                <Chat />
              )}
            </div>
            <div className="chat_Show_Not">
              {signInAs && signInAs.value === "teacher" ? (
                <MainTeacher />
              ) : (
                <Main />
              )}
            </div>
          </>) :
            (
              <Home />
            )}
        </Route>
        {/* for reset password*/}
        
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>
        <Route path="/addcoursesubject">
          <AddCourseSubject />
        </Route>
        <Route path="/checkdocument">
          {signInAs ? (<CheckDocument />) : (
            <Home />
          )}
        </Route>
        <Route path="/adduserinfo">
          <AddCourse />
        </Route>
        {/* <Route path="/editcourses">
          <EditCourse />
        </Route> */}

        <Route path="/notification">
          {signInAs ? (<Notification />) : (
            <Home />
          )}
        </Route>
        <Route path="/update">
          {signInAs ? (<UpdatePage />) : (<Home />)}
        </Route>
        <Route path="/leaderboard">
          {signInAs ? (<LeaderBoard />) : (<Home />)}
        </Route>
        <Route path="/main">
          {signInAs ? (<>
            {signInAs && signInAs.value === "teacher" ? (
              <MainTeacher />
            ) : (
              <Main />
            )}
          </>) : (<Home />)}
        </Route>
        <Route path="/AssignmentsPage">
          {signInAs ? (<>
            {signInAs && signInAs.value === "teacher" ? (
              <AssignmentsPageForTeacher />
            ) : (
              <AssignmentsPage />
            )}
          </>) : (<Home />)}
        </Route>
        <Route path="/profile">
          {signInAs ? (<Profile />) : (<Home />)}
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/test preparation sat">
          <Test_Prepsat />
        </Route>
        <Route path="/test preparation neet">
          <Test_Prepneet />
        </Route>
        <Route path="/test preparation jee">
          <Test_PrepJee />
        </Route>
        <Route path="/test preparation ielts">
          <Test_Prepielts />
        </Route>
        <Route path="/headerSidebar">
          <HeaderSidebar />
        </Route>
        <Route path="/courseArchieve">
          <CourseArchieve />
        </Route>
        <Route path="/primaryEducation">
          <PrimaryEducation />
        </Route>
        <Route path="/secondaryEducation">
          <SecondaryEducation />
        </Route>
        <Route path="/higherSecondaryEducation">
          <HigherSecondaryEducation />
        </Route>
        <Route path="/languages">
          <Languages />
        </Route>
        <Route path="/signIn">
          <Login />
        </Route>
        <Route path="/NoticesPage">
          {signInAs ? (<NoticesPage />) : (<Home />)}
        </Route>
        <Route path="/DoubtsPage">
          {signInAs ? (<>
            {signInAs && signInAs.value === "teacher" ? (
              <DoubtsPageForTeacher />
            ) : (
              <DoubtsPage />
            )}
          </>) : (<Home />)}
        </Route>
        <Route path="/doubtsMessagesPageForTeachers">
          {signInAs ? (<MessagesSectionForMobile />) : (<Home />)}
        </Route>
        <Route path="/submitAssignment">
          {signInAs ? (<SubmitAssignment />) : (<Home />)}
        </Route>
        <Route path="/uploadCorrectedAssignmentPage">
          {signInAs ? (<UploadCorrectedAssignment />) : (<Home />)}
        </Route>
        <Route path="/uploadCreatedAssignment">
          {signInAs ? (<UploadCreatedAssignment />) : (<Home />)}
        </Route>
        <Route path="/ViewAssignment/:assignmentId">
          {signInAs ? (<ViewAssignmentPage />) : (<Home />)}
        </Route>
        <Route path="/viewPdf">
          {signInAs ? (<ViewPdf />) : (<Home />)}
        </Route>
        <Route path="/Notifications">
          {signInAs ? (<>
            {signInAs && signInAs.value === "teacher" ? (
              <NotificationsPageForTeacher />
            ) : (
              <NotificationPage />
            )}
          </>) : (<Home />)}
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/createProfile">
          <CreateProfile />
        </Route>
        {/* admin */}
        <Route path="/addteacherinfo">
          <Admin />
        </Route>
        <Route path="/addstudentinfo">
          <Admin />
        </Route>
        <Route path="/addcourses">
          <Admin />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/addcourse">
          <Admin />
        </Route>
        <Route path="/addcoursebyadmin">
          <AddCourse />
        </Route>
        <Route path="/addteacher">
          <Admin />
        </Route>
        <Route path="/addstudent">
          <Admin />
        </Route>
        <Route path="/addadmin">
          <Admin />
        </Route>
        {/* '/ */}
        <Route path="/">
          {!signInAs ? (
            <Home />
          ) : signInAs && signInAs.value === "teacher" ? (
            <MainTeacher />
          ) : (
            <Main />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;