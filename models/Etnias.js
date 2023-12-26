const Sequelize = require("sequelize");
const database = require("./database.js");

const Etnias = database.define('etnias',{
    id_etn:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_etn: Sequelize.STRING,
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Etnias;