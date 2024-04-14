const express = require("express");
const router = express.Router();
const { getAll } = require("../controller/common");
const {handleStudentlogin,
  handleInstructorlogin,
  handleAdminlogin}=require("../login");
router.route("/").get(getAll);
router.route("/Student").get(handleStudentlogin);
router.route("/Instructor").get(handleInstructorlogin);
router.route("/adminLogin").get(handleAdminlogin);
module.exports = router;
