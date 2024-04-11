// company.js

const mongoose = require("mongoose");

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
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
