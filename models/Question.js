const mongoose = require("mongoose");
require("dotenv").config();



//2.Creating Schema
const questionSchema = new mongoose.Schema({
  prnNo: {
    type: String,
    required: true,
  },
  companylogo: {
    type: String,
    required: true,
  },
  Question_no: {
    type: Number,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  puzzlelink: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  interview: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  QA: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
});

//3.Exporting the Schema
module.exports = mongoose.model("Question", questionSchema);
