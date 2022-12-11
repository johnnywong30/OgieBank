import { initializeApp } from "firebase/app";

// should move to a .env file
// then populate to heroku's CONFIG VARS 
const firebaseConfig = {
  apiKey: "AIzaSyBQBRN1M5XHtGmo4H9jWa21k87x-BQ97s8",
  authDomain: "ogiebank-d48a5.firebaseapp.com",
  projectId: "ogiebank-d48a5",
  storageBucket: "ogiebank-d48a5.appspot.com",
  messagingSenderId: "684910276831",
  appId: "1:684910276831:web:ea257758c781d7476bb96a",
  measurementId: "G-N7BHYKL5BQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp

