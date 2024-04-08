const express = require("express");
const router = express.Router();

// //Import controller
// const{Instructor}=require("../controller/instructor");

// //define api routes
// router.post("/instructor",Instructor);


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
