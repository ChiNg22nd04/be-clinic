const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const router = require("./src/routes/index");
const app = express();

const { connectDB } = require("./src/database/sequelize");

// Middleware để phân tích cú pháp yêu cầu có nội dung JSON
app.use(bodyParser.json());
app.use(express.json());
// Middleware để phân tích cú pháp yêu cầu URL-encoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", router);

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
