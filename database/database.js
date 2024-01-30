const sequelize = require("sequelize");

const connection = new sequelize(process.env.DB_NAME, "root", process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;