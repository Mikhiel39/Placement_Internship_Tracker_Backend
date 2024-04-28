//1.Importing mongoose
const mongoose = require("mongoose");
require("dotenv").config();

//2.Creating Schema
const studentSchema = new mongoose.Schema({
  prnNo: {
    type: String,
    required: true,
  },
  instructoremailId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  about: {
    type: String,
    trim: true,
  },

  contactNumber: {
    type: Number,
    trim: true,
  },
  studentemailId: {
    type: String,
    trim: true,
  },
  regId: {
    type: String,
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
  Leetcode: {
    type: String,
  },
  CodeChef: {
    type: String,
  },
  CodeForces: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://tse4.mm.bing.net/th/id/OIP.dHkd14jfi_Oo1fuGyifuiwHaDt?w=736&h=368&rs=1&pid=ImgDetMain",
  },
  bgimage: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsq9tqudxCWoJMWzbqRQA1xSwZftG97Z5tNCtUtRll0w&s",
  },
  resume: {
    type: String,
  },
  internshipStatus: {
    type: String,
    enum: ["Yes", "No"],
  },

  placementStatus: {
    type: String,
    enum: ["Yes", "No"],
  },
  cgpa: {
    type: Number,
  },
  year: {
    type: Number,
  },
  department: {
    type: String,
    default: "IT",
  },
});

const student = mongoose.model("Student", studentSchema);
module.exports = student;
