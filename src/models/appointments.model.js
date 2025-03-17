const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const MedicalRecords = sequelize.define("MedicalRecords", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
	patientId: {
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: "PatientProfile",
			key: "patientID",
		},
		onDelete: "CASCADE",
	},
	createAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = MedicalRecords;
