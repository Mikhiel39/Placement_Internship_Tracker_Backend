const express = require("express");
const router = express.Router();
const {
  addBatch,
  deleteBatch,
  updatebgimage,
  updateimage,
  getInstructorByEmailID,
} = require("../controller/instructor");

const {
  getStudentByprnno,
  getInternshipByprnno,
  getPlacementByprnno,
  getQuestionByprnno,
} = require("../controller/admin");

const { getQuestionByprnnoopen } = require("../controller/student");

router.route("/").get(getInstructorByEmailID);
router.route("/image/").patch(updateimage);
router.route("/bgimage/").patch(updatebgimage);
router
  .route("/student/")
  .get(getStudentByprnno)
  .post(addBatch)
  .delete(deleteBatch);
router.route("/student/internship/").get(getInternshipByprnno),
  router.route("/student/placement/").get(getPlacementByprnno),
  router.route("/student/question/").get(getQuestionByprnno),
  router.route("/student/question/open").get(getQuestionByprnnoopen),


    module.exports = router;
