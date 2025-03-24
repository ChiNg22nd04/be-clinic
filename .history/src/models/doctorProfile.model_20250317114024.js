const { DataTypes } = require("sequelize");
const sequelize = require("../database/connect");

const User = sequelize.define("User", {
	id: {
		type: DataTypes.Int,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.Varchar(100),
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.Varchar(100),
		allowNull: false,
	},
	fullname: {
		type: DataTypes.NVarchar(100),
		allowNull: true,
		defaultValue: null,
	},
	phone: {
		type: DataTypes.Varchar(20),
		allowNull: true,
		defaultValue: null,
	},
	username: {
		type: DataTypes.Varchar(100),
		allowNull: false,
		unique: true,
	},
	createAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	role: {
		type: DataTypes.Int,
		allowNull: false,
		validate: {
			isIn: [[0, 1, 2]], // 0: Admin, 1: Doctor, 2: Patient
		},
		defaultValue: 2,
	},
});

module.exports = User;
