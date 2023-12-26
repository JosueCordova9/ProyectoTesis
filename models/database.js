const Sequelize = require('sequelize');

const database = new Sequelize('dece', 'root', '1804218681', {
    host: 'localhost',
    dialect: 'mariadb',
    freezeTableName: true,
    logging: false,
});

database.sync();
module.exports = database;
