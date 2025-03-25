const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	port: process.env.DB_PORT,
	logging: console.log, // Disable SQL logging or Bật logging để debug SQL query
	dialectOptions: {
		encrypt: true,
		trustServerCertificate: true,
	},
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connection successful!");
	} catch (error) {
		console.error("Database connection failed:", error);
		process.exit(1);
	}
};

module.exports = { sequelize, connectDB };
