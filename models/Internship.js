//1.Importing mongoose
const mongoose=require("mongoose");
require("dotenv").config();


//2.Creating Schema
const internshipSchema = new mongoose.Schema({
  prnNo: {
    type: String,
    required: true,
  },
  internshipName: {
    type: String,
    required: true,
    trim: true,
  },
  offerLetter: {
    type: String,
    trim: true,
    required: true,
  },
  completionLetter: {
    type: String,
    trim: true,
  },

  internshipDescription: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  stipend: {
    type: Number,
    required: true,
  },

  companyname: {
    type: String,
    required: true,
  },

  internTitle: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },

  externalInstructors: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      externalInstructorsemailId: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

//3.Exporting the Schema
module.exports=mongoose.model("Intership",internshipSchema);