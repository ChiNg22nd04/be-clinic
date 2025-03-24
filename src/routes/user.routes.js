const express = require("express");
const authJwt = require("../middleware/authorizeRole");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post("/schedule-appointment", authJwt.authorizeRole, UserController.scheduleAppointment);

module.exports = router;
