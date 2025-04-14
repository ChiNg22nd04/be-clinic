const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const User = require("./user.model");
const Shifts = require("./shifts.model");

const StaffShifts = sequelize.define(
	"StaffShifts",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		staffId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
		shiftId: {
			type: DataTypes.INTEGER,
			references: {
				model: Shifts,
				key: "id",
			},
		},
		workDate: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue("workDate");
				return rawValue ? rawValue.toISOString().substring(0, 10) : null; // VD: "2025-04-14"
			},
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);
module.exports = StaffShifts;
