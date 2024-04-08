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
  addBatch,
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
  updateInstructorMail,
} = require("../controller/admin");
  router
    .route("/")
    .get(getInstructor)
    .get(getStudent)
    .get(getAdmin)
    .post(addInstructor)
    .post(addStudent)
    .post(addAdmin)
    .post(addInternship)
    .post(addPlacement)
    router.route("/:emailID").get(getInstructorByEmailID);
  router
    .route("/:prnNo")
    .get(getStudentByprnno)
    .get(getInternshipByprnno)
    .get(getPlacementByprnno)
    .get(getQuestionByprnno)
    .patch(updateCompletionLetterInternship)
    .post(addBatch)
  router.route("/:emailId").patch(updateInstructorMail)
  router
    .route("/:emailID/:prnNo")
    .get(
      getStudentByInstructor,
      getInternshipByInstructor,
      getPlacementByInstructor,
      getQuestionByInstructor,
    );

module.exports = router;
