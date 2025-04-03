const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const PatientProfile = require("./patientProfile.model");
const ProfileStaff = require("./profileStaff.model");

const Appointments = sequelize.define(
	"Appointments",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		patientId: {
			type: DataTypes.INTEGER,
			references: {
				model: PatientProfile,
				key: "patientId",
			},
		},
		staffId: {
			type: DataTypes.INTEGER,
			references: {
				model: ProfileStaff,
				key: "staffId",
			},
		},
		symptoms: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
		},
		appointmentDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		status: {
			type: DataTypes.INTEGER,
			validate: {
				isIn: [[0, 1, 2]], //0: Pending, 1: Confirmed, 2: Completed
			},
			defaultValue: 0,
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);
module.exports = Appointments;
