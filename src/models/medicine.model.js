const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Medicine = sequelize.define("Medicine", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.NVarchar(255),
		allowNull: false,
	},
	description: {
		type: DataTypes.NVarchar(255),
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
});

module.exports = Medicine;
