import React , {useState , useEffect} from "react";
import styled from "styled-components";
import {useStateValue} from "../../StateProvider"
import db, { auth } from "../../firebase"
import { Link, useHistory } from "react-router-dom";
import { actionTypes } from "../../reducer";

function Login() {
  const[{signInAs,user} , dispatch] = useStateValue();
  const[email , setEmail] = useState();
  const[password , setPassword] = useState();
  const history = useHistory();
  console.log(user)

  const sign_in = (e) => {
    e.preventDefault(); 
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        dispatch({
          type : actionTypes.SET_USER,
           user: auth.user,
      })
      })
      .catch((error) => alert(error.message));
  };
  useEffect(()=>{
    if(user?.uid){
       db.collection('users').doc(user?.uid).onSnapshot((snapshot)=>(
      //  dispatch({
      //     type:actionTypes.SIGN_IN_AS,
      //     signInAs:snapshot.data(),
      //    });
        console.log(snapshot.data())
       ))
    }
    },[user?.uid]);
    console.log(user?.uid,signInAs)
  useEffect(()=>{
    if(signInAs?.value === "teacher"){
      history.push("/main");
    }
    else if(signInAs?.value  === "student"){
      db.collection("students").doc(user?.uid).onSnapshot((snapshot) => {
        dispatch({
          type : actionTypes.SET_USER_INFO,
          userInfo : snapshot.data()
        })
      })
      history.push("/main");
    }
  },[signInAs,user])
  const create_new_account = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth)
          db.collection("students").doc(auth.user?.uid).set({
            email : auth.user?.email,
            name : "Ronak"
          })
          history.push("/AssignmentsPage");
        }
      })
      .catch((error) => alert(error.message));
  }
  
  

  return (
    <div className="login">
      <Container>
        <div className="right">
          <div className="right_content">
           <img src="img/ShootingStarLogo.png" alt="No" />
            <form action="">
              <div className="signIn_form">
                <div className="email">
                  <p>Email</p>
                  <input type="text"
                  placeholder="Enter email address"
                  value = {email}
                  onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="password">
                  <p>Password</p>
                  <input type="password" 
                  placeholder="Enter password"
                  value = {password}
                  onChange = {e => setPassword(e.target.value)}
                  />
                </div>
                <div className="sign_In_button">
                  <button onClick = {create_new_account}>Create</button>
                  <button onClick = {sign_in}>Sign In</button>
                </div>
              </div>
            </form>
            <a className="forgot_password">Forgot Password?</a>
          </div>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f0f0f0;
  }

  .right_content {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;

    img{
        height : 70px;
        object-fit: contain;
        margin-bottom: 30px;
    }

    
    a{
        font-size: 14px;
        text-decoration : none;
        margin-top : 10px;
        text-align : center;
        &:hover{
            cursor : pointer;
        }
    }
  }

  .signIn_form {
    border: 1px solid lightgray;
    padding: 10px;
    padding-left: 20px;
    border-radius: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
     box-shadow: 0 0 15px -2px lightgray;
  }

  .heading {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    font-style: italic;
  }

  .email {
    p {
      margin-bottom: 10px;
      font-size: 15px;
    }
    input {
      margin-bottom: 10px;
      border-radius: 5px;
      width: 95%;
      height: 40px;
      padding: 10px;
    }
  }

  .password {
    p {
      margin-bottom: 10px;
      font-size: 15px;
    }
    input {
      margin-bottom: 10px;
      border-radius: 5px;
      width: 95%;
      height: 40px;
      padding: 10px;
    }
  }

  .sign_In_button {
    display: flex;
    justify-content: flex-end;
    button {
      background-color: #1877f2;
      border-radius: 20px;
      width: 80px;
      height: 35px;
      color: white;
      margin-left : 20px;

      &:hover {
        background-color: #3f8ef7;
      }
    }
  }

  @media(max-width:500px){
     .signIn_form{
         width : 80vw;
         input{
             width : 90%;
         }
     }

  }


  
`;

export default Login;
