const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const {
	getAppointment,
	updateStatusAppointment,
	getAllExamination,
	createInvoice,
	getAllInvoice,
} = require("../controllers/receptionist.controller");

const router = express.Router();
// API đặt lịch khám bệnh
router.get("/appointment/get-all", verifyToken, authorizeRole(2), getAppointment);
router.put("/appointment/update-status", verifyToken, authorizeRole(2), updateStatusAppointment);
router.get("/examination/get-all", verifyToken, authorizeRole(2), getAllExamination);
router.post("/invoice/create", verifyToken, authorizeRole(2), createInvoice);
router.get("/invoice/get-all", verifyToken, authorizeRole(2), getAllInvoice);

router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
