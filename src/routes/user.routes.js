const express = require("express");
const { authorizeRole } = require("../middleware/authorizeRole");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post("/schedule-appointment", authorizeRole, UserController.scheduleAppointment);

module.exports = router;
