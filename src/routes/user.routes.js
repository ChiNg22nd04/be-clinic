const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const { scheduleAppointment } = require("../controllers/user.controller");

const router = express.Router();
// schedule-appointment
// API đặt lịch khám bệnh
router.post("/schedule-appointment", verifyToken, scheduleAppointment);
router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
