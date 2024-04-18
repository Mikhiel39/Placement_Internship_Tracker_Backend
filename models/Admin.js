// In ../models/Admin.js

const mongoose = require("mongoose");
require("dotenv").config();

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
  },

  contactNumber: {
    type: String, // Changed from Number to String
    trim: true,
  },

  adminemailId: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    default: "IT"
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
