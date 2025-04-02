const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const { getAppointment } = require("../controllers/receptionist.controller");

const router = express.Router();
// API đặt lịch khám bệnh
router.get("/appointment/get-all", verifyToken, authorizeRole(2), getAppointment);
router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
