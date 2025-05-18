const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const { validateUser } = require("../middleware/validateUser");
const { getAllStaff, getAllPatient, createStaff } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/staff/get-all", verifyToken, authorizeRole(0), getAllStaff);

router.post("/staff/create", verifyToken, authorizeRole(0), validateUser("register"), createStaff);

router.get("/patient/get-all", verifyToken, authorizeRole(0), getAllPatient);

router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
