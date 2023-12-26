const Sequelize = require("sequelize");
const database = require("./database.js");

const Provincias = database.define('provincias',{
    id_prov:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_prov: Sequelize.STRING,
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Provincias;