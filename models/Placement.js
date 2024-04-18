//1.Importing mongoose
const mongoose=require("mongoose");
require("dotenv").config();


//2.Creating Schema
const placementSchema = new mongoose.Schema({
  prnNo: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    trim: true,
  },
  offerLetter: {
    type: String,
    trim: true,
  },
  jobDescription: {
    type: String,
  },

  location: {
    type: String,
  },

  salary: {
    type: Number,
    required: true,
  },

  companyname: {
    type: String,
    required: true,
  },

  domain: {
    type: String,
  },
});

//3.Exporting the Schema
module.exports=mongoose.model("Placement",placementSchema);