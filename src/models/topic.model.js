const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Topic = sequelize.define(
	"Topic",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		topicName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
	},
	{
		tableName: "[Topic]", // Chỉ định rõ tên bảng
		timestamps: true,
		updatedAt: false,
	}
);

module.exports = Topic;
