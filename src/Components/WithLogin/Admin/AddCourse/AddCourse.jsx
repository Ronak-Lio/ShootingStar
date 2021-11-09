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
import Head from "./Head";

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [alreadyCourse,setAlreadyCourse]=useState(false);
  const [courses,setCourses]=useState([]);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: ""},
  ]);

  var array = [];
  for (var i = 0; i < inputFields.length; i++) {
    array[i] = inputFields[i].firstName;
  }

  // console.log(array)
  useEffect(()=>{
    setAlreadyCourse(false)
    db.collection('CoursesName').where('name',"==",courseName)
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        setAlreadyCourse(true)
      })
    })
  },[courseName]);

  useEffect(()=>{
    db.collection('CoursesName').onSnapshot((snapshot)=>(
      setCourses( snapshot.docs.map((doc) => ({ 
        data: doc.data(),
        id: doc.id,
      })))
    ))
  },[]) 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!alreadyCourse){
  if(array && courseName ){ db.collection('CoursesName').add({
  name:courseName,
  subjects:array,
   })
   setCourseName('');
   setInputFields([{ id: uuidv4(), firstName: ""},])
  }else{
    alert('Fill the input field');
  }
}else{
  alert('Course already exist')
}
  };

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
        <h1>Add Course</h1>
        <div className="addCourseName">
          <span>
            <TextField
              // name="firstName"
              label="Enter course name"
              variant="filled"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
              id="textfield"
            />
          </span>
          <form >
            {inputFields.map((inputField) => (
              <div key={inputField.id}>
                <TextField
                  name="firstName"
                  label="Subject Name"
                  variant="filled"
                  value={inputField.firstName}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                  id="textfield"
                />
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
            ))}
            <div className="Buttom">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                className="Button__send"
              >
                Send
              </Button>
            </div>
          </form>
          <div className="allCourses">
               {courses.map((course)=>(
                //  <>{course.data.name}</>
                <Head course={course}/>
               ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default AddCourse;
