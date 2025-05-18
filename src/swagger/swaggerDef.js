// swaggerDef.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Hospital Management API",
			version: "1.0.0",
			description: "API quản lý nhân viên, bệnh nhân, người dùng, v.v.",
		},
		servers: [{ url: "http://localhost:3500" }],
	},
	apis: ["./src/docs/*.yaml", "./src/routes/*.js"], // hoặc từng controller
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
