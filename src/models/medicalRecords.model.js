const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const PatientProfile = require("./patientProfile.model");

const MedicalRecords = sequelize.define(
	"MedicalRecords",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		patientId: {
			type: DataTypes.INTEGER,
			unique: true,
			references: {
				model: PatientProfile,
				key: "patientID",
			},
			onDelete: "CASCADE",
		},
		createAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);
module.exports = MedicalRecords;
