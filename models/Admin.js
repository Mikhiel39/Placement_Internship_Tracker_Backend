const mongoose = require("mongoose");

// Make Admin Schema
const adminSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email"]
  },
  password: {
    type: String,
    required: [true, "Please enter password"]
  }
});

// Make model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Object.freeze({
  Admin,
});
