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
  },
  LinkedIN: {
    type: String,
  },
  Github: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
  resume: {
    type: String,
    required: true,
  },
  intershipStatus: {
    type: Boolean,
    enum: ["Yes", "No"],
    required: true,
  },

  placementStatus: {
    type: Boolean,
    enum: ["Yes", "No"],
    required: true,
  },
  cgpa: {
    type: Float,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const student=mongoose.model("Student", studentSchema);
module.exports=student;

