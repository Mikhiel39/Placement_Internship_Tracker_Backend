const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
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
// router.patch("/image", upload.single("image"), updateimage);
// router.patch("/bgimage", upload.single("bgimage"), updatebgimage);
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
