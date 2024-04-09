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
module.exports = router;
