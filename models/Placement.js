//1.Importing mongoose
const mongoose=required("mongoose");
require("dotenv").config();


//2.Creating Schema
const placementSchema = new mongoose.Schema({
  prnNo: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },

  jobDescription: {
    type: String,
    required: true,
  },

  location: {
    type: string,
    required: true,
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
    required: true,
  },
});

//3.Exporting the Schema
module.exports=mongoose.model("Placement",placementSchema);