const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");

const Users = sequelize.define(
	"Users",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255), // Tăng độ dài để tránh lỗi
			allowNull: false,
		},
		fullName: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING, // Đổi từ INTEGER thành STRING để lưu số điện thoại
			allowNull: true,
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: true,
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
				isIn: [[0, 1, 2]], // 0: Admin, 1: Doctor, 2: Patient
			},
			defaultValue: 2,
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);

module.exports = Users; 
