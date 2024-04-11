const express = require("express");
const router = express.Router();
const {
  getInstructor,
  getStudent,
  getAdmin,
  addInstructor,
  addStudent,
  addAdmin,
  addInternship,
  addPlacement,
  getStudentByInstructor,
  getInstructorByEmailID,
  getStudentByprnno,
  getInternshipByInstructor,
  getInternshipByprnno,
  getPlacementByprnno,
  getPlacementByInstructor,
  getQuestionByprnno,
  getQuestionByInstructor,
  getQuestionByInstructoropen,
  deleteAdmin,
  deleteInstructor,
  deleteStudent,
  getAdminbyadminemailId,
} = require("../controller/admin");
const { addBatch, deleteBatch } = require("../controller/instructor");
const { getQuestionByprnnoopen } =require("../controller/student");

// Import the controller function for  companies
const { addCompany,
  deleteCompany, 
  updateCompany,
  getAllCompanies,
  getCompanyByName} = require("../controller/company");


//Importing controller from Alumni
const {  getAlumniByName,
  addAlumni,
  deleteAlumniByName,
  updateAlumniByName,
  getAlumniByCompany,getAlumni} = require("../controller/alumni");
const { getQuestionByprnnoopen } =require("../controller/student");

// Import the controller function for tnp coordinators
const {getTnpByName,
  addTnp,
  deleteTnpByName,
  updateTnpByName,
  getTnp,} = require("../controller/tnpcoordinator");

  //Importing controller for Notification
const{ getNotificationAll, 
  getNotificationByTitle, 
  addNotification, 
  deleteNotificationByCompanyName,  
  updateNotificationByCompanyName,
}=require("../controller/notification");


router.route("/").get(getAdminbyadminemailId);
router
  .route("/instructor/")
  .get(getInstructor)
  .post(addInstructor)
router.route("/admin/").get(getAdmin).post(addAdmin).delete(deleteAdmin);;
router
  .route("/student/")
  .get(getStudent,)
  .post(addStudent);
router.route("/instructor/ByEmail/")
  .get(getInstructorByEmailID)
  .delete(deleteInstructor);
router.route("/student/ByPrnNo").get(getStudentByprnno).delete(deleteStudent);
router
  .route("/internship/")
  .post(addInternship)
  .get(getInternshipByprnno);
router
  .route("/placement/")
  .post(addPlacement)
  .get(getPlacementByprnno);
router.route("/question/ByPrnNo").get(getQuestionByprnno);
router.route("/question/ByPrnNo/open").get(getQuestionByprnnoopen);
router
  .route("/student/ByInstructor/")
  .get(getStudentByInstructor)
  .post(addBatch)
  .delete(deleteBatch);
  router.route("/internship/ByInstructor/").get(getInternshipByInstructor);
  router.route("/placement/ByInstructor/").get(getPlacementByInstructor);
  router.route("/question/ByInstructor/").get(getQuestionByInstructor);
  router.route("/question/ByInstructor/open").get(getQuestionByInstructoropen);

  // New route for companies by admins
router.route("/company/").get(getAllCompanies).post(addCompany).delete(deleteCompany).patch(updateCompany);
router.route("/company/name/").get(getCompanyByName);

// New route for alumni by admins
router.route("/alumni/").get(getAlumni).post(addAlumni);
router.route("/alumni/name/").get(getAlumniByName).patch(updateAlumniByName).delete(deleteAlumniByName);
router.route
("/alumni/company/").get(getAlumniByCompany);

// New route for Tnp Cordinator by admins
router.route("/tnpcoordinator/").get(getTnp).post(addTnp);
router.route("/tnpcoordinator/name/").get(getTnpByName).patch(updateTnpByName).delete(deleteTnpByName);

// New route for Notification by admins
router.route("/notification/").get(getNotificationAll).post(addNotification);
router.route("/notification/title/").get(getNotificationByTitle);
router.route("/notification/companyname/").patch(updateNotificationByCompanyName).delete(deleteNotificationByCompanyName);

module.exports = router;
