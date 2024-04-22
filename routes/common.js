const express = require("express");
const router = express.Router();
const { getAll, updateInstructorEmailId } = require("../controller/common");
const {
  handleStudentLogin,
  handleInstructorlogin,
  handleAdminlogin,
} = require("../login");
router.route("/").get(getAll);
router.route("/changeEmail").patch(updateInstructorEmailId);
router.route("/Student").post(handleStudentLogin);
router.route("/Instructor").post(handleInstructorlogin);
router.route("/adminLogin").post(handleAdminlogin);
module.exports = router;
