//1.Importing mongoose
const mongoose=required("mongoose");
require("dotenv").config();
//2.Creating Schema
const progressSchema = new mongoose.Schema({
  prnNo: {
    type: String,
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