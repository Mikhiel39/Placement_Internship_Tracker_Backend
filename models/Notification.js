// company.js

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  
  link: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  
});

const Company = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
