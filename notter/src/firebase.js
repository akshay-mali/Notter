import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  });

  export const auth = app.auth();
  export default app;


  // // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyBPtxivFvFpcdELWnuDVTwwwvyfm0xxxEM",
  //   authDomain: "notter-126fe.firebaseapp.com",
  //   projectId: "notter-126fe",
  //   storageBucket: "notter-126fe.appspot.com",
  //   messagingSenderId: "821151179526",
  //   appId: "1:821151179526:web:e51c5bb7d35c142b997487"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);