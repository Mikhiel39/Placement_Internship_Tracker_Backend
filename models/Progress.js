//1.Importing mongoose
const mongoose=require("mongoose");
require("dotenv").config();
//2.Creating Schema
const progressSchema = new mongoose.Schema({
  prnNo: {
    type: Number,
    required: true,
  },
  intershipStatus: {
    type: Boolean,
    enum: ["Yes", "No"],
    required: true,
  },

  placementStatus: {
    type: Boolean,
    enum: ["Yes", "No"],
    required: true,
  },
});

//3.Exporting the Schema
module.exports=mongoose.model("Progress",progressSchema);