import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import db, { auth } from "../../../firebase";
import { Link, useHistory } from "react-router-dom";
import { actionTypes } from "../../../reducer";
import Loading from "../Loading/Loading";

function CreateProfile() {
  const [{ user }, dispatch] = useStateValue();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [courses, setCourses] = useState([]);
  const [value, setValue] = useState();
  const history = useHistory();

  useEffect(() => {
    console.log(courses);

    if (courses.length > 0 && value === "student") {
      db.collection("students").doc(user?.uid).set({
        name: name,
        address: address,
        contact: mobileNumber,
        email: user?.email,
      });

      for (let i = 0; i < courses.length; i++) {
        db.collection("students")
          .doc(user?.uid)
          .collection("courses")
          .add({
            name: courses[i]?.data?.name,
          })
          .then(() => {
            db.collection("students")
              .doc(user?.uid)
              .collection("courses")
              .where("name", "==", courses[i]?.data?.name)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id, " => ", doc.data());

                  for (let j = 0; j < courses[i].data?.subjects.length; j++) {
                    db.collection("students")
                      .doc(user?.uid)
                      .collection("courses")
                      .doc(doc.id)
                      .collection("subjects")
                      .add({
                        name: courses[i]?.data?.subjects[j],
                      });

                    db.collection("Courses")
                      .where("name", "==", courses[i]?.data?.name)
                      .get()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc1) => {
                          db.collection("Courses")
                            .doc(doc1.id)
                            .collection("Subjects")
                            .where("name", "==", courses[i]?.data?.subjects[j])
                            .get()
                            .then((querySnapshot) => {
                              querySnapshot.forEach((doc2) => {
                                db.collection("Courses")
                                  .doc(doc1.id)
                                  .collection("Subjects")
                                  .doc(doc2.id)
                                  .collection("students")
                                  .add({
                                    name: name,
                                  });
                              });
                            })
                            .catch((error) => {
                              console.log("Error getting documents: ", error);
                            });
                        });
                      })
                      .catch((error) => {
                        console.log("Error getting documents: ", error);
                      });
                  }
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          });
      }
      history.push("/")
    } else if (courses.length > 0 && value === "teacher") {
      for (let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courses[i].data?.subjects.length; j++) {
          db.collection("Courses")
            .where("name", "==", courses[i]?.data?.name)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc1) => {
                db.collection("Courses")
                  .doc(doc1.id)
                  .collection("Subjects")
                  .where("name", "==", courses[i]?.data?.subjects[j])
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc2) => {
                      db.collection("Courses")
                        .doc(doc1.id)
                        .collection("Subjects")
                        .doc(doc2.id)
                        .update({
                          teacher: name,
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      }
      history.push("/")
    }
  }, [courses?.length, value]);

  const create_account = (e) => {
    e.preventDefault();
    if (name && address && mobileNumber) {
      db.collection("users")
        .where("name", "==", name)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty === true) {
            db.collection("addByAdmin")
              .where("email", "==", user?.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id, " => ", doc.data());

                  setValue(doc.data().value);

                  db.collection("users").doc(user?.uid).set({
                    name: name,
                    address: address,
                    contact: mobileNumber,
                    value: doc.data().value,
                    imageURL : "",
                    imageID : "",
                  });

                  db.collection("addByAdmin")
                    .doc(doc.id)
                    .collection("courses")
                    .onSnapshot((snapshot) => {
                      setCourses(
                        snapshot.docs.map((doc) => ({
                          data: doc.data(),
                          id: doc.id,
                        }))
                      );
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });

            console.log(courses);
          } else {
            alert("Entered name alreay exists , please choose another name");
          }
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      alert("Please enter complete details");
    }
  };
  return (
    <Container>
      <div className="createProfile">
        <div className="profile_info">
          <p>Name:</p>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="address">
          <p>Address:</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div className="profile_info">
          <p>Mobile Number:</p>
          <input
            type="number"
            min="0"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="create_button">
          <button onClick={create_account}>Create</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;

  .createProfile {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    height: fit-content;
    border: 1px solid gray;
    border-radius: 10px;
    margin-top: auto;
    margin-bottom: auto;
    background-color: white;
    padding: 20px;

    @media (max-width: 420px) {
      width: 90vw;
    }
  }

  .profile_info {
    display: flex;
    flex-direction: column;
    p {
      margin-bottom: 10px;
    }
    input {
      border-radius: 5px;
      border: 1px solid gray;
      padding: 3px;
      margin-bottom: 5px;
    }
  }

  .address {
    textarea {
      font-size: 13px;
      resize: none;
      border: 1px solid gray;
      width: 100%;
    }
  }

  .create_button {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;

    button {
      background-color: #1877f2;
      border-radius: 20px;
      width: 80px;
      height: 35px;
      color: white;
      margin-left: 20px;

      &:hover {
        background-color: #3f8ef7;
      }
    }
  }
`;

export default CreateProfile;
