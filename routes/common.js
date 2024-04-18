const express = require("express");
const router = express.Router();
const { getAll } = require("../controller/common");
const {
  handleStudentlogin,
  handleInstructorlogin,
  handleAdminlogin,
} = require("../login");
router.route("/").get(getAll);
router.route("/Student").post(handleStudentlogin);
router.route("/Instructor").post(handleInstructorlogin);
router.route("/adminLogin").post(handleAdminlogin);
module.exports = router;
