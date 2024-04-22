const mongoose = require("mongoose");
require("dotenv").config();

const TokenSchema = new mongoose.Schema({
  encrypted: {
    type: String,
    required: true,
  },

  user: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("Token", TokenSchema);
