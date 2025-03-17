require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/database/sequelize");

const PORT = process.env.PORT || 3500;

const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Cannot start server due to database connection error:", error);
		process.exit(1);
	}
};
startServer();
