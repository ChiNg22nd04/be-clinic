const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Appointments = require("./appointments.model");

const ExaminationForm = sequelize.define(
	"ExaminationForm",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		numerical: {
			type: DataTypes.INTEGER,
		},
		medicalRecordID: {
			type: DataTypes.INTEGER,
			reference: {
				model: MedicalRecords,
				key: "id",
			},
			onDelete: "CASCADE",
		},
		idAppointment: {
			type: DataTypes.INTEGER,
			references: {
				model: Appointments,
				key: "id",
			},
			onDelete: "CASCADE",
		},
		doctorId: {
			type: DataTypes.INTEGER,
			references: {
				model: DoctorProfile,
				key: "doctorId",
			},
		},
		examinationDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		diagnosis: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
		},
		note: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);
module.exports = ExaminationForm;
