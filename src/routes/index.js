const express = require("express");

const router = express.Router();
const authRoutes = require("./auth.routes");
const receptionistRoutes = require("./receptionist.routes");
const doctorRoutes = require("./doctor.routes");
const adminRoutes = require("./admin.routes");
const userRoutes = require("./user.routes");
const commonRoutes = require("./common.routes");

router.use("/", authRoutes);
router.use("/page", commonRoutes);
router.use("/user", userRoutes);
router.use("/receptionist", receptionistRoutes);
router.use("/admin", adminRoutes);
router.use("/doctor", doctorRoutes);

console.log("✅ Routes initialized");
module.exports = router;
