const express = require("express");
const authJwt = require("../middleware/authorizeRole");

const UsersController = require("../controllers/users.controller");

const router = express.Router();

router.post("/schedule-appointment", authJwt.authorizeRole, UsersController.scheduleAppointment);

module.exports = router;
