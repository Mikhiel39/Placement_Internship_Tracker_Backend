const express = require("express");
const { geturl} = require("../utils/cloudinary");
const { multerUpload} = require("../middlewares/multer");
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

const { getQuestionByprnnoopen, logout } = require("../controller/student");

router.route("/").get(getInstructorByEmailID);
router.route("/logout").delete(logout);
router.patch("/image", multerUpload.single("image"), geturl, updateimage);
router.patch("/bgimage", multerUpload.single("bgimage"), geturl, updatebgimage);
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
