const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const ExaminationForm = require("./examinationForm.model");
const Medicine = require("./medicine.model");

const Prescription = sequelize.define(
	"Prescription",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		examinationFormId: {
			type: DataTypes.INTEGER,
			references: {
				model: ExaminationForm,
				key: "id",
			},
			onDelete: "CASCADE",
		},
		medicineId: {
			type: DataTypes.INTEGER,
			references: {
				model: Medicine,
				key: "id",
			},
			onDelete: "CASCADE",
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		usage: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Prescription;
