//1.Importing mongoose
const mongoose = require("mongoose");
require("dotenv").config();


//2.Creating Schema
const studentSchema = new mongoose.Schema({
  prnNo: {
    type: Number,
    required: true,
  },
  InstructoremailId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },

  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  about: {
    type: String,
    trim: true,
    required: true,
  },

  contactNumber: {
    type: Number,
    trim: true,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
  },
  regId: {
    type: Number,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  LinkedIN: {
    type: String,
    required: true,
  },
  Github: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const student=mongoose.model("Student", studentSchema);
module.exports=student;

