const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Clinics = require("./clinics.model");
const Specialty = require("./specialty.model");

const ClinicSpecialty = sequelize.define(
	"ClinicSpecialty",
	{
		clinic_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: Clinics,
				key: "clinicId",
			},
		},
		specialtyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: Specialty,
				key: "specialtyId",
			},
		},
	},
	{
		tableName: "[ClinicSpecialty]", // Chỉ định rõ tên bảng
		timestamps: true,
		updatedAt: false,
	}
);

module.exports = ClinicSpecialty;
