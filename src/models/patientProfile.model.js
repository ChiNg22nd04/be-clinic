const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const PatientProfile = sequelize.define("PatientProfile", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	patientID: {
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: "User",
			key: "id",
		},
		onDelete: "CASCADE",
	},
	dateOfBirth: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	gender: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isIn: [0, 1, 2], // 0: Nam, 1: Nữ, 2: Other
		},
	},
	address: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
});

module.exports = PatientProfile;
