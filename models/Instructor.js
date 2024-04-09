// 1. Importing mongoose
const mongoose = require("mongoose");
require("dotenv").config();

// 2. Creating Schema
const instructorSchema = new mongoose.Schema({
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
  instructoremailId: {
    type: String, // Capitalized "String", corrected property name to "emailId"
    required: true,
  },
  image: {
    type: String,
  },
  bgimage: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  students: [
    {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      prnNo: {
        type: String,
      },
    },
  ],
  department: {
    type: String,
    required: true,
  },
});

// 3. Exporting the Schema
module.exports = mongoose.model("Instructor", instructorSchema);
