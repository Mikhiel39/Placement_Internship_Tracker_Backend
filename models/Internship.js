//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const internshipSchema = new mongoose.Schema({
  intershipName: {
    type: String,
    required: true,
    trim: true,
  },

  intershipDescription: {
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

  stipend: {
    type: Number,
    required: true,
  },

  company: {
    type: String,
  },
  
  internTitle: {
    type: String,
    required: true,
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

  externalInstructors: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

//3.Exporting the Schema
module.exports=mongoose.model("Intership",internshipSchema);