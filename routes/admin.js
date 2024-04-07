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
  updateCompletionLetterInternship,
  updateOfferLetterInternship,
  updateOfferLetterPlacement,
  deleteAdmin,
  deleteInstructor,
  deleteStudent,
} = require("../controller/admin");
const { addBatch, deleteBatch } = require("../controller/instructor");
router.route("/instructor").get(getInstructor).post(addInstructor);
router.route("/admin").get(getAdmin).post(addAdmin);
router.route("/student").get(getStudent).post(addStudent);
router.route("/student/internship").post(addInternship);
router.route("/student/placement").post(addPlacement);
router
  .route("/:adminemailId/:instructoremailId")
  .get(getInstructorByEmailID)
  .post(addBatch)
  .delete(deleteInstructor);
router
  .route("/:adminemailId/:prnNo")
  .get(getStudentByprnno)
  .get(getInternshipByprnno)
  .get(getPlacementByprnno)
  .get(getQuestionByprnno)
  .patch(
    updateCompletionLetterInternship,
    updateOfferLetterInternship,
    updateOfferLetterPlacement
  )
  .delete(deleteStudent);
router
  .route("/:adminemailId/:instructoremailId/:prnNo")
  .get(
    getStudentByInstructor,
    getInternshipByInstructor,
    getPlacementByInstructor,
    getQuestionByInstructor
  )
  .delete(deleteBatch);
router.route("/:adminemailId/:emailId").delete(deleteAdmin);
module.exports = router;
