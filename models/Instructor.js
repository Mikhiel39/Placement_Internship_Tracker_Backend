// 1. Importing mongoose
const mongoose = require("mongoose");
require("dotenv").config();

// 2. Creating Schema
const instructorSchema = new mongoose.Schema({
  name: {
    type: String, // Capitalized "String"
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
  },

  contactNumber: {
    type: Number,
    trim: true,
  },
  instructoremailId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  },
  bgimage: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsq9tqudxCWoJMWzbqRQA1xSwZftG97Z5tNCtUtRll0w&s",
  },
  password: {
    type: String,
    required: true,
  },
  students: [
    {
      name: {
        type: String,
      },
      prnNo: {
        type: String,
      },
    },
  ],
  department: {
    type: String,
    default: "IT",
  },
});

// 3. Exporting the Schema
module.exports = mongoose.model("Instructor", instructorSchema);
