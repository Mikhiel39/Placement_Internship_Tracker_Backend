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

// Import the controller function for tnp coordinators
const {getTnp} = require("../controller/tnpcoordinator");

//Importing controller for Notification
const{getNotificationAll}=require("../controller/notificiation");
const { getAlumni } = require("../controller/alumni");
const { getAllCompanies } = require("../controller/company");

router
  .route("/")
  .get(getStudentByprnno)
  .patch(updateProfile)
  .post(addQuestion);
router
  .route("/internship/")
  .get(getInternshipByprnno)
  .post(addInternship)
  .patch(updateCompletionLetterInternship);
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
router.route("/image/").patch(updateimage);
router.route("/bgimage/").patch(updatebgimage);

// New route for Notification by inst as inst only see or fet the notification he is not able to delete,update,add notification
    router.route("/notification/").get(getNotificationAll);
    // New route for Tnp Cordinator by admins
    router.route("/tnpcoordinator/").get(getTnp);
    // New route for alumni by admins
    router.route("/alumni/").get(getAlumni);
    router.route("/company/").get(getAllCompanies);

module.exports = router;
