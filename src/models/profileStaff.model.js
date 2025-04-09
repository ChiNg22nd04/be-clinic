const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const User = require("./user.model");
const Specialty = require("./specialty.model");

const ProfileStaff = sequelize.define("ProfileStaff", {
	id: {
		type: DataTypes.INTEGER, // int trong sql server
		primaryKey: true,
		autoIncrement: true,
	},
	staffId: {
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: User,
			key: "id",
		},
		onDelete: "CASCADE",
		allowNull: false,
	},
	specialtyId: {
		type: DataTypes.INTEGER, // nvarchar trong sql server
		references: {
			model: Specialty,
			key: "specialtyId",
		},
		onDelete: "CASCADE",
	},
	department: {
		type: DataTypes.STRING(100),
		collate: "SQL_Latin1_General_CP1_CI_AS",
	},
	yearsOfExperience: {
		type: DataTypes.INTEGER,
	},
	education: {
		type: DataTypes.STRING(100),
		collate: "SQL_Latin1_General_CP1_CI_AS",
	},
});

module.exports = ProfileStaff;
