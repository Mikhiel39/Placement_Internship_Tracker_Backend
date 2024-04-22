const mongoose = require("mongoose");
require("dotenv").config();

const TokenSchema = new mongoose.Schema({
  encryptedprnNo: {
    type: String,
    required: true,
  },

  prnNo: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("Token", TokenSchema);
