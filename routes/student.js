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
  getToken,
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
  // .post("/", upload.single("companylogo"), addQuestion);
router.route("/token").get(getToken)
router
  .get("/internship",getInternshipByprnno)
//   .post("/internship",upload.single("offer"), addInternship)
// router.patch(
//   "/updateCompletionLetter",
//   upload.single("completion"),
//   updateCompletionLetterInternship
// );
router.get("/placement",getPlacementByprnno)
// .post("/placement",upload.single("offer"),addPlacement);
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
router.patch("/image",  multerUpload.single("image"), geturl, updateimage);
router.patch("/bgimage", multerUpload.single("bgimage"), geturl, updatebgimage);
router.patch("/resume", Uploadpdf.single("resume"), getUrl, updateresume);
module.exports = router;
