const express = require("express");
const router = express.Router();
const { getCsv } = require("../utils/cloudinary");
const { Uploadcsv } = require("../middlewares/multer");
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

// Import the controller function for  companies
const {
  upload,
  addCompany,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getCompanyByName,
  updatelogo,
} = require("../controller/company");


//Importing controller from Alumni
const {
  getAlumniByEmail,
  addAlumni,
  deleteAlumniByEmail,
  updateAlumniByEmail,
  getAlumniByCompany,
  getAlumni,
  updatealumniimage,
} = require("../controller/alumni");
const { getQuestionByprnnoopen } = require("../controller/student");

// Import the controller function for tnp coordinators
const {
  getTnpByEmail,
  addTnp,
  deleteTnpByEmail,
  updateTnpByEmail,
  getTnp,
  updatetnpimage,
} = require("../controller/tnpcoordinator");

  //Importing controller for Notification
const {
  getNotificationAll,
  getNotificationByTitle,
  addNotification,
  deleteNotificationByCompanyName,
  updateNotificationByCompanyName,
} = require("../controller/notificiation");

const {
  getAnnouncementAll,
  addAnnouncement,
  deleteAnnouncement,
} = require("../controller/announcement");


router.route("/").get(getAdminbyadminemailId);
router
  .route("/instructor/")
  .get(getInstructor)
  .post(addInstructor)
router.route("/admin/").get(getAdmin).post(addAdmin).delete(deleteAdmin);
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
// router.route("/question/ByPrnNo").get(getQuestionByprnno);
// router.route("/question/ByPrnNo/open").get(getQuestionByprnnoopen);
router
  .route("/student/ByInstructor/")
  .get(getStudentByInstructor)
  .post(addBatch)
  .delete(deleteBatch);
  router.route("/internship/ByInstructor/").get(getInternshipByInstructor);
  router.route("/placement/ByInstructor/").get(getPlacementByInstructor);
  // router.route("/question/ByInstructor/").get(getQuestionByInstructor);
  // router.route("/question/ByInstructor/open").get(getQuestionByInstructoropen);

  // New route for companies by admins
router.route("/company/").get(getAllCompanies).delete(deleteCompany).patch(updateCompany);
router.post("/company",upload.single("company"), addCompany);
router.route("/company/name/").get(getCompanyByName);
// router.route("/company/logo/").patch(updatelogo);

// New route for alumni by admins
router.route("/alumni/").get(getAlumni).post(addAlumni);
router
  .route("/alumni/email/")
  .get(getAlumniByEmail)
  .patch(updateAlumniByEmail)
  .delete(deleteAlumniByEmail);
// router.route
// ("/alumni/company/").get(getAlumniByCompany);
// router.route("/alumni/image/").patch(updatealumniimage);

// New route for Tnp Cordinator by admins
router.route("/tnpcoordinator/").get(getTnp).post(addTnp);
router
  .route("/tnpcoordinator/email/")
  .get(getTnpByEmail)
  .patch(updateTnpByEmail)
  .delete(deleteTnpByEmail);

// router
//   .route("/tnpcoordinator/image/")
//   .patch(updatetnpimage)

// New route for Notification by admins
router.route("/notification/").get(getNotificationAll).post(addNotification);
router.route("/notification/title/").get(getNotificationByTitle);
router.route("/notification/companyname/").patch(updateNotificationByCompanyName).delete(deleteNotificationByCompanyName);

router
  .route("/announcement/")
  .get(getAnnouncementAll)
  .post(addAnnouncement)
  .delete(deleteAnnouncement);

module.exports = router;
