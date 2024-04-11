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

//Importing controller for Notification
const{
  getNotificationAll, 
  getNotificationByTitle, 
}= require("../controller/notification");

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

// New route for Notification by students as student only see or fet the notification he is not able to delete,update,add notification
router.route("/notification/").get(getNotificationAll);
router.route("/notification/title/").get(getNotificationByTitle);

module.exports = router;
