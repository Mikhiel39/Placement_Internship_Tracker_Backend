const express = require("express");
const router = express.Router();
const {geturl, getUrl}=require("../utils/cloudinary")
const {multerUpload, Uploadpdf}=require("../middlewares/multer")

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
  logout,
  updateresume,
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
router.post("/", multerUpload.single("image"), geturl, addQuestion);
router.route("/logout").delete(logout);
router
  .get("/internship",getInternshipByprnno)
router.post(
  "/internship",
  Uploadpdf.single("internship"),
  getUrl,
  addInternship
);
router.patch(
  "/updateCompletionLetter",
  Uploadpdf.single("completion"),
  getUrl,
  updateCompletionLetterInternship
);
router.get("/placement",getPlacementByprnno)
router.post("/placement", Uploadpdf.single("placement"), getUrl, addPlacement);
router
  .route("/questions")
  .get(getQuestionByprnno)
  .delete(deleteQuestionByprnno);
router.route("/questions/open").get(getQuestionByprnnoopen);
router.route("/student/questions").get(getQuestions);
router.route("/student/questions/company").get(getQuestionBycompanyname);
router
  .route("/student/questions/company/open")
  .get(getQuestionByprncompanyoopen);
router.patch("/image",  multerUpload.single("image"), geturl, updateimage);
router.patch("/bgimage", multerUpload.single("bgimage"), geturl, updatebgimage);
router.patch("/resume", Uploadpdf.single("resume"), getUrl, updateresume);
module.exports = router;
