const express = require("express");

const router = express.Router();
const authRoutes = require("./auth.routes");
const receptionistRoutes = require("./receptionist.routes");
const userRoutes = require("./user.routes");

router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/receptionist", receptionistRoutes);

console.log("✅ Routes initialized");
module.exports = router;
