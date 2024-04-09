const express = require("express");
const router = express.Router();
const {
  getQuestions,
  updateimage,
  updatebgimage,
  updateProfile,
  getQuestionByprnnoopen,
  getQuestionBycompanyname,
  addQuestion,
  deleteQuestionByprnno,
  getQuestionByprncompanyoopen,
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
  .route("/student/")
  .get(getStudentByprnno)
  .patch(updateProfile)
  .post(addQuestion);
router
  .route("/student/internship/")
  .get(getInternshipByprnno)
  .post(addInternship)
  .patch(updateCompletionLetterInternship);
router.route("/student/placement/").get(getPlacementByprnno).post(addPlacement);
router
  .route("/student/questions/")
  .get(getQuestionByprnno)
  .delete(deleteQuestionByprnno);
router.route("/student/questions/open/").get(getQuestionByprnnoopen);
router.route("/questions/").get(getQuestions);
router.route("/questions/company/").get(getQuestionBycompanyname);
router.route("/questions/company/open/").get(getQuestionByprncompanyoopen);
router.route("/student/image/").patch(updateimage);
router.route("/student/bgimage/").patch(updatebgimage);

module.exports = router;
