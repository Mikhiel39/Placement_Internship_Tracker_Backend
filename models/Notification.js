// company.js

const mongoose = require("mongoose");
require("dotenv").config();

const notificationSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  
  link: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  postedAt: {
    type: Date,
    default: Date.now, 
  },
  
});

module.exports = mongoose.model("Notification", notificationSchema);