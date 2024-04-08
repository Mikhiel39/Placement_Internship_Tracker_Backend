const mongoose = require("mongoose");
require("dotenv").config();


// Make Resume Schema
const applicationSchema = mongoose.Schema({
  prnNo: {
    type: Number,
    required: true,
  },
  profile: {
    type: Object,
  },
  networks: {
    type: Object,
  },
  objectives: {
    type: Object,
  },
  workExp: {
    type: Object,
  },
  educations: {
    type: Object,
  },
  projects: {
    type: Object,
  },
  awards: {
    type: Object,
  },
  certifications: {
    type: Object,
  },
  skills: {
    type: Object,
  },
  hobbies: {
    type: Object,
  },
  languages: {
    type: Object,
  },
  references: {
    type: Object,
  },
});

// Make model
const Application = mongoose.model("Application", applicationSchema);

module.exports = Object.freeze({
  Application,
});
