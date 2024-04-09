const express = require("express");
const router = express.Router();
const {
  addBatch,
  deleteBatch,
  updatebgimage,
  updateimage,
} = require("../controller/instructor");

const {
  getStudentByprnno,
  getInternshipByprnno,
  getPlacementByprnno,
  getQuestionByprnno,
  getInstructorByEmailID,
} = require("../controller/admin");

const { getQuestionByprnnoopen } = require("../controller/student");

router.route("/instructor/").get(getInstructorByEmailID);
router.route("/instructor/image/").patch(updateimage);
router.route("/instructor/bgimage/").patch(updatebgimage);
router
  .route("/instructor/student/")
  .get(getStudentByprnno)
  .post(addBatch)
  .delete(deleteBatch);
router.route("/instructor/student/internship/").get(getInternshipByprnno),
  router.route("/instructor/student/placement/").get(getPlacementByprnno),
  router.route("/instructor/student/question/").get(getQuestionByprnno),
  router.route("/instructor/student/question/open").get(getQuestionByprnnoopen),
  (module.exports = router);
