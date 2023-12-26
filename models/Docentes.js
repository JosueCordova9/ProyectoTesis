const Sequelize = require("sequelize");
const database = require("./database.js");

const Docentes = database.define('docentes',{
    id_doc:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ced_doc: Sequelize.STRING,
    nom_doc: Sequelize.STRING,
    ape_doc: Sequelize.STRING,
    tel_doc: Sequelize.STRING,
    dir_doc: Sequelize.STRING
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Docentes;