const mongoose = require("mongoose");
require("dotenv").config();

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
    type: String
  },

  linkedin: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  tnpemailId: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("TnpCordinator", TnpCordinatorSchema);
