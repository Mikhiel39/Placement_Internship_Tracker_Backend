// In ../models/Admin.js

const mongoose = require("mongoose");
require("dotenv").config();



const adminSchema = new mongoose.Schema({
  firstname: {
    type: String, // Capitalized "String"
    required: true,
  },

  lastname: {
    type: String, // Capitalized "String"
    required: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },

  contactNumber: {
    type: Number, // Capitalized "Number"
    trim: true,
  },
  emailId: {
    type: String, // Capitalized "String", corrected property name to "emailId"
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
