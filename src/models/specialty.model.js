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
			type: DataTypes.STRING(255),
			allowNull: false,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		introduce: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		services: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
	},
	{
		tableName: "[Specialty]", // Chỉ định rõ tên bảng
		timestamps: true,
		updatedAt: false,
	}
);

module.exports = Specialty;
