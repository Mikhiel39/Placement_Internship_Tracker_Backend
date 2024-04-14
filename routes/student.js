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

// New route for Notification by inst as inst only see or fet the notification he is not able to delete,update,add notification
    router.route("/notification/").get(getNotificationAll);
    // New route for Tnp Cordinator by admins
    router.route("/tnpcoordinator/").get(getTnp);
    // New route for alumni by admins
    router.route("/alumni/").get(getAlumni);
    router.route("/company/").get(getAllCompanies);

module.exports = router;
