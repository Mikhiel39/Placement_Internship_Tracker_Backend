const mongoose = require("mongoose");
require("dotenv").config();

//2.Creating Schema
const questionmodelSchema = new mongoose.Schema({
  prnNo: {
    type: String,
    required: true,
  },
  questions: [
    {
      Question_no: {
        type: Number,
        required: true,
      },
      companyname: {
        type: String,
        required: true,
      },
      companylogo: {
        type: String,
        required: true,
      },
    },
  ],
});

//3.Exporting the Schema
module.exports = mongoose.model("Question_model", questionmodelSchema);
