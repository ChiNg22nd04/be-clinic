const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");

const Shifts = sequelize.define(
	"Shifts",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		shiftName: {
			type: DataTypes.STRING(50),
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		startTime: {
			type: DataTypes.TIME,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue("startTime");
				return rawValue ? rawValue.toString().substring(0, 5) : null; // VD: "17:00"
			},
		},

		endTime: {
			type: DataTypes.TIME,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue("endTime");
				return rawValue ? rawValue.toString().substring(0, 5) : null; // VD: "17:00"
			},
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);
module.exports = Shifts;
