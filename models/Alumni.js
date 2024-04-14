const mongoose = require("mongoose");
require("dotenv").config();

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yearOfPassout: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  testimonial: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  alumniemailId:{
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Alumni", alumniSchema);
