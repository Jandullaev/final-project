// Import the functions you need from the SDKs you need
// eslint-disable-next-line no-undef
const firebase = require("firebase/compat/app");
require("firebase/compat/firestores");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATF_efrjtYuHpQEhSipNLwIWckd4WSkfc",
  authDomain: "web-project-895e6.firebaseapp.com",
  projectId: "web-project-895e6",
  storageBucket: "web-project-895e6.appspot.com",
  messagingSenderId: "946090366659",
  appId: "1:946090366659:web:853b9ffc35cd235194b476",
  measurementId: "G-Z3WT5CKYY4",
};

// Initialize Firebase
firebase(firebaseConfig);
const db = firebase.firestore();
const Users = db.collection("Users");
// eslint-disable-next-line no-undef
module.exports = Users;
