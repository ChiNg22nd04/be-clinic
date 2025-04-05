const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		fullName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: true,
			defaultValue: null,
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: null,
			unique: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		role: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isIn: [[0, 1, 2, 3]], // 0: Admin, 1: Doctor, 2: receptionist, 3: Patient
			},
			defaultValue: 2,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true, // convert false: 0, true: 1
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false, // convert false: 0, true: 1
		},
		verificationCode: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null,
		},
		otpSentCount: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		otpLastSentAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: null,
		},
	},
	{
		tableName: "[User]", // Chỉ định rõ tên bảng
		timestamps: true,
		updatedAt: false,
	}
);

module.exports = User;
