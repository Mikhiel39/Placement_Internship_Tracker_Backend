const mongoose = require("mongoose");
require("dotenv").config();

const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
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
  },
  date:{
    type:String,
  },
  link: {
    type: String,
  },
  
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
