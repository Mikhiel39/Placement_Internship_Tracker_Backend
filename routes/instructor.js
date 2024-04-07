const express = require("express");
const router = express.Router();
const {
  addBatch,
  deleteBatch,
} = require("../controller/instructor");

const {
  getStudentByprnno,
  getInternshipByprnno,
  getPlacementByprnno,
  getQuestionByprnno,
  getInstructorByEmailID,
} = require("../controller/admin");

router.route("/:instructoremailId").get(getInstructorByEmailID);
router
  .route("/:instructoremailId/:prnNo")
  .get(
    getStudentByprnno,
    getInternshipByprnno,
    getPlacementByprnno,
    getQuestionByprnno
  )
  .post(addBatch)
  .delete(deleteBatch)
module.exports = router;
