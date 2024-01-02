// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const cors = require("cors");
// eslint-disable-next-line no-undef
const Booking = require("./config");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/create", async (req, res) => {
  try {
    const data = req.body;
    console.log("Received data:", data);
    // Use the add method on the collection reference
    const result = await Booking.add(data);
    console.log("Document added with ID: ", result.id);
    res.send({ msg: "form has been booked" });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(4000, () => console.log("Server is running on *4000"));
