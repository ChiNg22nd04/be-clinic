const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database_name", "username", "password", {
	host: "localhost",
	dialect: "mssql", // Sử dụng SQL Server
});

module.exports = sequelize;
