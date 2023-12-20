// import  {initializeApp}  from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyBOS10lwrnk3vos_X3SQFKfnasgVRN0cyo",
  authDomain: "contactform-library.firebaseapp.com",
  databaseURL: "https://contactform-library-default-rtdb.firebaseio.com",
  projectId: "contactform-library",
  storageBucket: "contactform-library.appspot.com",
  messagingSenderId: "346164243097",
  appId: "1:346164243097:web:7861a585666c640dd2a608"
};

// Initilize firebase
const app = initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref('contactForm');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal('name');
  var email = getElementVal('email');
  var phone = getElementVal('phone');
  var message = getElementVal('message');

  console.log(name, email, phone, message);

}

const saveMessages = (name, email, phone, message) => {
   var newContactForm = contactFormDB.push();

   newContactForm.set({
    name : name,
    email : email,
    phone : phone,
    message : message,
   });
};

const getElementVal = (id) => {
   return document.getElementById(id).value;
};