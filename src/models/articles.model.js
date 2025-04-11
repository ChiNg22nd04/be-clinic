const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const Articles = sequelize.define(
	"Articles",
	{
		articleId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		content: {
			type: DataTypes.TEXT,
			collate: "SQL_Latin1_General_CP1_CI_AS",
			allowNull: true,
			defaultValue: null,
		},
		author: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
			collate: "SQL_Latin1_General_CP1_CI_AS",
		},
		publishedDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		category: {
			type: DataTypes.INTEGER,
			references: {
				model: Topic,
				key: "id",
			},
		},
	},
	{
		tableName: "[Articles]", // Chỉ định rõ tên bảng
		timestamps: true,
		updatedAt: false,
	}
);

module.exports = Articles;
