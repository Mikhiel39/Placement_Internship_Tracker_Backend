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
const {getAllCompanies } = require("../controller/company");

// Import the controller function for tnp coordinators
const {getTnp} = require("../controller/tnpcoordinator");

//Importing controller for Notification
const{getNotificationAll}=require("../controller/notificiation");
const { getAlumni } = require("../controller/alumni");

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

    // New route for Notification by inst as inst only see or fet the notification he is not able to delete,update,add notification
    router.route("/notification/").get(getNotificationAll);
    // New route for Tnp Cordinator by admins
    router.route("/tnpcoordinator/").get(getTnp);
    // New route for alumni by admins
    router.route("/alumni/").get(getAlumni);
    router.route("/company/").get(getAllCompanies);

    module.exports = router;
