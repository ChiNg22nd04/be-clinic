const express = require("express");

const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

router.use("/", authRoutes);
// router.use("/user", userRoutes);
router.use(
	"/user",
	(req, res, next) => {
		console.log("✅ /user route accessed");
		next();
	},
	userRoutes
);

module.exports = router;
