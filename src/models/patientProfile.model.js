const { DataTypes } = require("sequelize");
const sequelize = require("../database/connect");

const PatientProfile = sequelize.define("PatientProfile", {
	id: {
		type: DataTypes.Int,
		primaryKey: true,
		autoIncrement: true,
	},
	patientIDpatientID: {
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
	},
});

module.exports = PatientProfile;
