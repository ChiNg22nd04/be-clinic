const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Clinic = sequelize.define(
	"Clinic",
	{
		clinicId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		clinicName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		phoneNumber: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		working_hours: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
		},
		email_address: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "[Clinic]", // Chỉ định rõ tên bảng
		timestamps: true,
		updatedAt: false,
	}
);

module.exports = Clinic;
