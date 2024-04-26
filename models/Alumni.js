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
    default: "IT",
  },
  image: {
    type: String,
    default: null,
  },
  alumniemailId: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
});

module.exports = mongoose.model("Alumni", alumniSchema);
