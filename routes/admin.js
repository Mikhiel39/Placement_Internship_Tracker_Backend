const express = require("express");
const router = express.Router();
const { makeAddAdmin } = require("../controller/Admin/admin_add");

router.get("/admin_add", makeAddAdmin);

module.exports = router;
