import React , {useState , useEffect} from 'react'
import styled from "styled-components"
import { useStateValue } from "../../../../StateProvider";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from "../../../../reducer";
import StudentAssignmentStatus from "./StudentAssignmentStatus";
import db , {storage} from "../../../../firebase";
import {useParams ,  useHistory} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



function ViewAssignmentPage() {
 const [{ openAssignmentPopupForTeacher  , teacherSubjectId , teacherCourseId , user }, dispatch] = useStateValue();
  const[answers , setAnswers] = useState([]);
  const {assignmentId} = useParams();
  const[assignmentTeacherDetails , setAssignmentTeacherDetails] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(teacherSubjectId);
      if(user && assignmentId && teacherCourseId && teacherSubjectId ){
    db.collection("Courses")
    .doc(teacherCourseId)
    .collection("Subjects")
    .doc(teacherSubjectId)
    .collection("assignments")
    .doc(assignmentId).onSnapshot((snapshot) => {
      console.log(snapshot);
      setAssignmentTeacherDetails(snapshot.data());
    })
      }
    console.log("ASSIGNMENTDETIALS ARE ",assignmentTeacherDetails)
  } , [assignmentId ,  teacherSubjectId , teacherCourseId , assignmentTeacherDetails.length , user])

  useEffect(() => {
    if(user && teacherCourseId && teacherSubjectId && assignmentTeacherDetails?.name){
    console.log(assignmentTeacherDetails) 
    db.collection("Courses")
    .doc(teacherCourseId)
    .collection("Subjects")
    .doc(teacherSubjectId)
    .collection("assignments")
    .doc(assignmentId)
    .collection("answers")
    .onSnapshot((snapshot) => 
     setAnswers(
      snapshot.docs.map((doc) => ({
        id : doc.id,
        data: doc.data(),
      }))
     )
    )
    }
  } , [assignmentTeacherDetails , answers.length , assignmentId , teacherSubjectId , teacherCourseId]);

  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const view_pdf = (e) => {
    e.preventDefault();
    history.push("/viewPdf");
    dispatch({
      type : actionTypes.SET_VIEW_PDF,
      viewPdf : true
    });
    dispatch({
      type : actionTypes.SET_PDF_URL,
      pdfUrl : assignmentTeacherDetails?.assignmentUrl
    })
  }


    return (
       <>
        <Container>
           <ViewAssignments>
               <div className="given_assignment_div">
                 <div className="given_assignment_div_header">
                  <ArrowBackIcon className="arrow_back_icon" onClick = {goBack}/>
                 <p className = "assignment_name">{assignmentTeacherDetails?.name}</p>
                 </div>
                  <div className = "assignment_description">
                  {assignmentTeacherDetails?.description}
                  </div>
                  {assignmentTeacherDetails?.assignmentUrl && (
                <div className="assignment_attatched" onClick = {view_pdf}>
                <p>
                  {assignmentTeacherDetails?.assignmentUploadedName?.length <= 38 ? <>{assignmentTeacherDetails?.assignmentUploadedName}</> : <>{assignmentTeacherDetails?.assignmentUploadedName?.slice(0, 38)}</>}
                </p>
              </div>
             )}
               </div>
               <div className="students_assignment_report">
               {answers.map((answer) => 
                <StudentAssignmentStatus name  = {answer.data.name} answerUrl = {answer.data.answerUrl} fileName = {answer.data.fileName} assignmentName = {assignmentTeacherDetails?.name} submissionDate  = {assignmentTeacherDetails?.submissionDate}/>
               )}  
               </div>
           </ViewAssignments>  
        </Container>
       </>
    )
};

const Container = styled.div`
height : 100vh;
width : 100vw;
display : flex;
justify-content : center;
background-color : #fdfafa;

`;

const ViewAssignments = styled.div`
 display : flex;
 flex-direction : row;
 width : 75%;
 height : 85%;
 border : 1px solid lightgray;
 margin-top : auto;
 margin-bottom : auto;
 box-shadow :  0 0 15px -2px lightgray;
 background-color : white;

 @media (max-width: 628px) {
 margin : 20px;
 width : 100%;
 height : 95%;
 flex-direction : column;
 }
 
 .given_assignment_div{
     display : flex;
     flex-direction : column;
     flex : 0.5;
     border-right : 1px solid lightgray;
     padding: 10px;

     @media (max-width: 628px) {
       flex : 0;
     }

     .given_assignment_div_header{
       display : flex;
     }

     .assignment_name{
      text-align: center;
      width: 100%;
     }

     .assignment_description{
        max-height : 490px ;
        overflow-y : scroll;
        margin-bottom : 10px;
        @media (max-width: 628px) {
         height : fit-content;
         max-height : fit-content;
     }
     }

     .assignment_attatched {
    background-color: lightgray;
    padding: 7px;
    padding-left: 15px;
    max-width: 90%;
    border-radius: 10px;
    margin-bottom: 10px;

    &:hover {
      background-color : #e2e0e0;
      cursor : pointer;
    }
  }

 }


 .students_assignment_report{
      display: flex;
      flex-direction: column;
      flex : 0.5;
      overflow-y : scroll;
  }

  .arrow_back_icon{
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

 
`;



export default ViewAssignmentPage
