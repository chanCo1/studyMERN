// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRdMMEY3dC6YxEBvUEi8Mr6HEhhx0M7j0",
  authDomain: "react-community-2ebd1.firebaseapp.com",
  projectId: "react-community-2ebd1",
  storageBucket: "react-community-2ebd1.appspot.com",
  messagingSenderId: "313851541324",
  appId: "1:313851541324:web:c14b789339d0d56f0881e9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;