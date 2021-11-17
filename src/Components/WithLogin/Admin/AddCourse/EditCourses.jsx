import React, { useEffect, useState } from "react";
import "./AddCourse.css";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import db from '../../../../firebase';
import AdminField from "../Main/AdminField";
import Head from './Head';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function EditCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseNameID, setCourseNameID] = useState('');
  const [courseNameInfo, setCourseNameInfo] = useState([]);
  const [loading,setLoading]=useState();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: ""},
  ]);

  var array = [];
  for (var i = 0; i < inputFields.length; i++) {
    array[i] = inputFields[i].firstName;
  }

  //   search course name data
  const searchCourseId=()=>{
    setLoading(true)
    db.collection('CoursesName').where('name',"==",courseName)
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        setCourseNameID(doc.id);
        setCourseNameInfo(doc.data())
      })
      setLoading(false)
    })
  } 
  
  const handleSubmit = (e) => {
    e.preventDefault();
  if(array[0] != '' && courseName && courseNameID!=""){ db.collection('CoursesName').doc(courseNameID).update({
  name:courseName,
  subjects:array,
   })
   setCourseName('');
   setInputFields([{ id: uuidv4(), firstName: ""},])
  }else{
    alert('Also fill name of subject');
    setCourseName('')
  }
}

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    console.log(inputFields);
    if (inputFields[inputFields.length - 1].firstName && courseName) {
      setInputFields([...inputFields, { id: uuidv4(), firstName: "" }]);
    } else {
      alert("Input is empty or course name is not entered");
    }
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <>
      <div className="addCourse">
        <h1>Edit Course</h1>
        <div className="addCourseName">
        <form >
          <div className="addCourseName__lite">
            <div>
            <TextField 
              label="Enter course name"
              variant="filled"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
              id="textfield"
            />
            {courseNameInfo && courseName }
            </div>
          <div>
          <IconButton onClick={searchCourseId}>
          <ArrowForwardIcon/>
          </IconButton>
          </div>
          </div>
          <div>
          </div>
            {loading ? 
              <div className="inputField">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress fontSize="large" />
              </Box>
              </div>
              : inputFields.map((inputField) => (
              <div key={inputField.id} className="inputField">
                <TextField
                  name="firstName"
                  label="Subject Name"
                  variant="filled"
                  value={inputField.firstName}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                  id="textfield"
                />
                <div  className={'AddCourse__plus_minusIcon'}>
                <IconButton
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                  >
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleAddFields}>
                  <AddIcon />
                </IconButton>
                  </div>
              </div>
            ))}
            <div className="Buttom">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                className="Button__send"
              >
                Add
              </Button>
            </div>
          </form> 
        </div>
      </div>
    </>
  );
}
export default EditCourse;
