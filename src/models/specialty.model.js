const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Specialty = sequelize.define(
	"Specialty",
	{
		specialtyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		specialtyName: {
			type: DataTypes.TEXT,
			collate: "SQL_Latin1_General_CP1_CI_AS",
			allowNull: false,
		},
		introduce: {
			type: DataTypes.TEXT,
			collate: "SQL_Latin1_General_CP1_CI_AS",
			allowNull: true,
			defaultValue: null,
		},
		services: {
			type: DataTypes.TEXT,
			collate: "SQL_Latin1_General_CP1_CI_AS",
			allowNull: true,
			defaultValue: null,
		},
	},
	{
		tableName: "[Specialty]", // Chỉ định rõ tên bảng
		timestamps: true,
		updatedAt: false,
	}
);

module.exports = Specialty;
