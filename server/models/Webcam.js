const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedWebcams` array in User.js
const webcamSchema = new Schema({
  // saved webcam id from WindyWebcams
  webcamId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
});

module.exports = webcamSchema;
