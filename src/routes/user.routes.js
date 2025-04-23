const express = require("express");
const multer = require("multer");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const {
	scheduleAppointment,
	getAllAppointment,
	updateUserInfo,
	getProfile,
	updateUserAvatar,
} = require("../controllers/user.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/schedule-appointment", verifyToken, scheduleAppointment);
router.post("/appointment/get-all", verifyToken, getAllAppointment);
router.put("/profile", verifyToken, getProfile);
// router.post("/update", verifyToken, upload.single("avatar"), updateUserProfile, (req, res) => {
// 	console.log(req.file);
// 	console.log(req.body);
// });
router.put("/upload-profile", verifyToken, updateUserInfo);
router.put("/upload-avatar", verifyToken, upload.single("image"), updateUserAvatar);

router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
