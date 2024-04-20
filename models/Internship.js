//1.Importing mongoose
const mongoose=require("mongoose");
require("dotenv").config();


//2.Creating Schema
const internshipSchema = new mongoose.Schema({
  noInternship: {
    type: String,
    required: true,
  },
  prnNo: {
    type: String,
  },
  internshipName: {
    type: String,
    // required: true,
    trim: true,
  },
  offerLetter: {
    type: String,
    trim: true,
  },
  completionLetter: {
    type: String,
    trim: true,
  },

  internshipDescription: {
    type: String,
    // required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    // required: true,
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
    // required: true,
  },
  domain: {
    type: String,
  },

  externalInstructors: [
    {
      name: {
        type: String,
        // required: true,
        trim: true,
      },
      externalInstructorsemailId: {
        type: String,
        // required: true,
        trim: true,
      },
      externalInstructorscontactNo: {
        type: String,
        // required: true,
        trim: true,
      },
    },
  ],
});

//3.Exporting the Schema
module.exports=mongoose.model("Intership",internshipSchema);