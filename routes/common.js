const express = require("express");
const router = express.Router();
const { getAll } = require("../controller/common");
router.route("/").get(getAll);
module.exports = router;
