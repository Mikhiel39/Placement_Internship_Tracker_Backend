const mongoose = required("mongoose");
require("dotenv").config();



//2.Creating Schema
const questionSchema = new mongoose.Schema({
  prnNo: {
    type: Number,
    required: true,
  },
  companykexp: {
    type: String,
    required: true,
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
