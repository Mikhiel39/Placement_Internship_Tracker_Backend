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
    default:
      "https://i.pinimg.com/736x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg",
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
