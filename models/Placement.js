//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const placementSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true,
  },

  jobDescription: {
    type: String,
    required: true,
  },

  duration: {
    type: date,
    required: true,
  },

  location: {
    type: string,
    required: true,
  },

  ratingAndReviwes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],

  salary: {
    type: Number,
    required: true,
  },

  company: {
    type: String,
  },

  domain: {
    type: String,
    required: true,
  },

  internalInstructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
});

//3.Exporting the Schema
module.exports=mongoose.model("Placement",placementSchema);