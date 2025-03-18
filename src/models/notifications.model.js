const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./user.model");

const Notifications = sequelize.define(
	"Notifications",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
			onDelete: "CASCADE",
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isRead: {
			type: DataTypes.BOOLEAN, // convert false: 0, true: 1
			defaultValue: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Notifications;
