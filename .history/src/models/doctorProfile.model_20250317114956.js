const { DataTypes } = require("sequelize");
const sequelize = require("../database/connect");

const DoctorProfile = sequelize.define("DoctorProfile", {
	id: {
		type: DataTypes.Int,
		primaryKey: true,
		autoIncrement: true,
	},
	doctorID: {
		type: DataTypes.Int,
		unique: true,
		references: {
			model: "User",
			key: "id",
		},
		onDelete: "CASCADE",
	},
	specialization: {
		type: DataTypes.Varchar(100),
		allowNull: false,
	},
	experience: {
		type: DataTypes.Int,
		allowNull: true,
		defaultValue: null,
	},
});

module.exports = DoctorProfile;
