const express = require("express");
const router = express.Router();
const {
  getInstructorByEmailID,
  getStudentByprnno,
  getInternshipByprnno,
  getPlacementByprnno,
  getQuestionByprnno,
} = require("../controller/instructor");

router.route("/:emailID").get(getInstructorByEmailID);
router
  .route("/:emailID/:prnNo")
  .get(
    getStudentByprnno,
    getInternshipByprnno,
    getPlacementByprnno,
    getQuestionByprnno
  );
module.exports = router;
