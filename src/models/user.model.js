const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.VARCHAR(50),
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.VARCHAR(15),
		allowNull: false,
	},
	fullname: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	phone: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	username: {
		type: DataTypes.VARCHAR(50),
		allowNull: false,
		unique: true,
	},
	createAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	role: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isIn: [[0, 1, 2]], // 0: Admin, 1: Doctor, 2: Patient
		},
		defaultValue: 2,
	},
});

module.exports = User;