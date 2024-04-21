const mongoose = require("mongoose");
require("dotenv").config();

const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  numberOfStudentsPlaced: {
    type: Number,
    default: 0,
  },
  avgPackage: {
    type: Number,
    default: 0,
  },
  logo: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  date:{
    type:String,
    required:true,
  },
  link: {
    type: String,
    required: true,
  },
  
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
