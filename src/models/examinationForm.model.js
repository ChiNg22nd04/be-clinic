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
		paymentStatus: {
			type: DataTypes.INTEGER,
			validate: {
				isIn: [[0, 1, 2]], // 0: Pending, 1: Completed, 2: Failed
			},
			defaultValue: 0,
		},
		paymentMethod: {
			type: DataTypes.INTEGER,
			validate: {
				isIn: [[0, 1, 2, 3]], // 0: Cash, 1: Card, 2: InternetBanking, 3: Other
			},
			defaultValue: 0,
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
module.exports = ExaminationForm;
