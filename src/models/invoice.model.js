const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const ExaminationForm = require("./examinationForm.model");

const Invoice = sequelize.define(
	"Invoice",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		examinationFormID: {
			type: DataTypes.INTEGER,
			references: {
				model: ExaminationForm,
				key: "id",
			},
			onDelete: "CASCADE",
		},
		totalAmount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		paymentStatus: {
			type: DataTypes.INTEGER,
			validate: {
				isIn: [[0, 1, 2]], // 0: Pending, 1: Completed, 2: Failed
			},
			defaultValue: 0,
		},
		paymentMethod: {
			type: DataTypes.INTEGER,
			validate: {
				isIn: [[0, 1, 2, 3]], // 0: Cash, 1: Card, 2: InternetBanking, 3: Other
			},
			defaultValue: 0,
		},
		createAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: true, // Bật createdAt và updatedAt tự động
	}
);
module.exports = Invoice;
