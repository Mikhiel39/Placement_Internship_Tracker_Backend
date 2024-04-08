const express = require("express");
const router = express.Router();
const {
  getQuestions,
  updateAbout,
  updateSkills,
  updateLinkedIN,
  updateGithub,
  updateimage,
  updateresume,
  getQuestionBycompanyname,
  getQuestionByprnnocompanyname,
  addQuestion,
  deleteQuestionByprnnocompanyname,
} = require("../controller/student");
const {
  updateCompletionLetterInternship,
  addInternship,
  addPlacement,
  getStudentByprnno,
  getInternshipByprnno,
  getPlacementByprnno,
  getQuestionByprnno,
} = require("../controller/admin");

router
  .route("/:prnNo")
  .get(
    getStudentByprnno,
    getQuestionByprnno,
    getQuestions
  )
  .patch(
    updateAbout,
    updateSkills,
    updateLinkedIN,
    updateGithub,
    updateimage,
    updateresume,
    updateCompletionLetterInternship,
  )
  .post(addQuestion);
  router
    .route("/:prnNo/internship")
    .get(getInternshipByprnno)
    .post(addInternship);
  router.route("/:prnNo/placement").get(getPlacementByprnno).post(addPlacement);
  router
  .route("/:prnNo/:companyname")
  .get(getQuestionBycompanyname, getQuestionByprnnocompanyname)
  .delete(deleteQuestionByprnnocompanyname)

module.exports = router;
