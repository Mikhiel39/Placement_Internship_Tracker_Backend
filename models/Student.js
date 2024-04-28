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
      "https://tse2.mm.bing.net/th/id/OIP.sup6nxHto7ytOKBhMY1XNgAAAA?w=180&h=180&rs=1&pid=ImgDetMain",
  },
  bgimage: {
    type: String,
    default:
      "https://www.campusoption.com/images/colleges/gallery/25_01_17_063629_College2.jpghttps://images.app.goo.gl/yrxzxRzz2jD8FPg39",
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
