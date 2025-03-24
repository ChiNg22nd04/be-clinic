const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./user.model"); // Import model User

const PatientProfile = sequelize.define(
	"PatientProfile",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		patientId: {
			type: DataTypes.INTEGER,
			unique: true,
			references: {
				model: User, // Tham chiếu đến model User
				key: "id",
			},
			onDelete: "CASCADE",
			allowNull: false,
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: null,
		},
		gender: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isIn: [[0, 1, 2]], // 0: Nam, 1: Nữ, 2: Other
			},
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
		},
	},
	{
		timestamps: true, // Bật createdAt, updatedAt
	}
);

module.exports = PatientProfile;
