const mongoose = require("mongoose");

const TnpCordinatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  department: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  linkedin: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  emailId: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("TnpCordinator", TnpCordinatorSchema);
