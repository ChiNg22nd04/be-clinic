const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./user.model");

const DoctorProfile = sequelize.define("DoctorProfile", {
	id: {
		type: DataTypes.INTEGER, // int trong sql server
		primaryKey: true,
		autoIncrement: true,
	},
	doctorId: {
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: User,
			key: "id",
		},
		onDelete: "CASCADE",
		allowNull: false,
	},
	specialization: {
		type: DataTypes.STRING(100), // nvarchar trong sql server
		allowNull: false,
	},
	experience: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: null,
	},
});

module.exports = DoctorProfile;
