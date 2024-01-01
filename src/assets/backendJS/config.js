// eslint-disable-next-line no-undef
const { initializeApp } = require("firebase/compat/app");
// eslint-disable-next-line no-undef
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyATF_efrjtYuHpQEhSipNLwIWckd4WSkfc",
  authDomain: "web-project-895e6.firebaseapp.com",
  projectId: "web-project-895e6",
  storageBucket: "web-project-895e6.appspot.com",
  messagingSenderId: "946090366659",
  appId: "1:946090366659:web:853b9ffc35cd235194b476",
  measurementId: "G-Z3WT5CKYY4",
};

const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const Booking = collection(db, "Booking");
// eslint-disable-next-line no-undef
module.exports = {
  add: async (data) => await addDoc(Booking, data),
};
