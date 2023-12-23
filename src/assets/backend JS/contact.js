document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contactForm");
  const loadingMessage = document.querySelector(".loading");
  const errorMessage = document.querySelector(".error_message");
  const sentMessage = document.querySelector(".sent_message");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Fetch the form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      // Show loading message
      loadingMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';

      // Make a POST request to your server
      fetch("http://localhost:4000/create", {
          method: "POST",
          headers: {
            'Accept' : 'application/json',
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name , email, phone , message  }),
      })
          .then((response) => response.json())
          .then((data) => {
              // Handle the response from the server
              console.log(data);

              // Update UI based on server response
              if (data.msg === 'form has been booked') {
                  sentMessage.style.display = 'block';
              } else {
                  errorMessage.style.display = 'block';
              }

              // Hide loading message
              loadingMessage.style.display = 'none';
          })
          .catch((error) => {
              console.error("Error submitting form:", error);
              errorMessage.style.display = 'block';
              loadingMessage.style.display = 'none';
          });
  });
});


// eslint-disable-next-line no-undef
const express = require('express')
// eslint-disable-next-line no-undef
const Booking=require("./config")
const app=express()
app.use(express.json())

app.post('/create', async (req, res) => {
  try {
    const data = req.body;
    console.log('Received data:', data);
    // Use the add method on the collection reference
    const result = await Booking.add(data);
    console.log('Document added with ID: ', result.id);
    res.send({ msg: 'form has been booked' });
  } catch (error) {
    console.error('Error adding document: ', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
app.listen(4000, () => console.log("Server is running on *4000"));