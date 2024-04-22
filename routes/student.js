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
  getStudentByprnno,
  deleteQuestionByprnno,
  getQuestionByprncompanyoopen,
  upload,
} = require("../controller/student");
const {
  updateCompletionLetterInternship,
  addInternship,
  addPlacement,
  getInternshipByprnno,
  getPlacementByprnno,
  getQuestionByprnno,
} = require("../controller/admin");

router.route("/").get(getStudentByprnno).patch(updateProfile).post(addQuestion);
router
  .route("/internship/")
  .get(getInternshipByprnno)
  .post(addInternship)
router.patch(
  "/internship",
  upload.single("resume"),
  updateCompletionLetterInternship
);
router.route("/placement/").get(getPlacementByprnno).post(addPlacement);
router
  .route("/questions/")
  .get(getQuestionByprnno)
  .delete(deleteQuestionByprnno);
router.route("/questions/open/").get(getQuestionByprnnoopen);
router.route("student/questions/").get(getQuestions);
router.route("student/questions/company/").get(getQuestionBycompanyname);
router
  .route("student/questions/company/open/")
  .get(getQuestionByprncompanyoopen);
router.patch("/image", upload.single("image"), updateimage);
router.patch("/bgimage", upload.single("bgimage"), updatebgimage);

module.exports = router;
