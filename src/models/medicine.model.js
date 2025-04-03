const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");

const Medicine = sequelize.define(
	"Medicine",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);
module.exports = Medicine;
