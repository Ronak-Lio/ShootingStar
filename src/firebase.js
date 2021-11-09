import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCwWNP_JfSXfUaVW0kXfR6CK7oEzjfZ9VU",
    authDomain: "shootingstareducation.firebaseapp.com",
    projectId: "shootingstareducation",
    storageBucket: "shootingstareducation.appspot.com",
    messagingSenderId: "1010322839641",
    appId: "1:1010322839641:web:53f72ff3ba78181e38f948",
    measurementId: "G-4NGE3W5DD1"
  };
 
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebaseApp.auth();
//   const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth , storage };

  export default db;