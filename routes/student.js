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
  getToken,
  updateresume,
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

router
  .get("/", getStudentByprnno)
  .patch("/", updateProfile)
  .post("/", upload.single("companylogo"), addQuestion);
router.route("/token").get(getToken)
router
  .get("/internship",getInternshipByprnno)
  .post("/internship",upload.single("offer"), addInternship)
router.patch(
  "/updateCompletionLetter",
  upload.single("completion"),
  updateCompletionLetterInternship
);
router.get("/placement",getPlacementByprnno).post("/placement",upload.single("offer"),addPlacement);
router
  .route("/questions")
  .get(getQuestionByprnno)
  .delete(deleteQuestionByprnno);
router.route("/questions/open").get(getQuestionByprnnoopen);
router.route("student/questions").get(getQuestions);
router.route("student/questions/company").get(getQuestionBycompanyname);
router
  .route("student/questions/company/open")
  .get(getQuestionByprncompanyoopen);
router.patch("/image", upload.single("image"), updateimage);
router.patch("/bgimage", upload.single("bgimage"), updatebgimage);
router.patch("/resume", upload.single("resume"), updateresume);
module.exports = router;
