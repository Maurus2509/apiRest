const sequelize = require("sequelize");
const connection = require("./database");

const games = connection.define("game", {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    year:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    category:{
        type: sequelize.STRING,
        allowNull: false
    }
});

games.sync({ force: false }).then(() => { });

module.exports = games;
