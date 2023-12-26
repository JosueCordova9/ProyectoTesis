const Sequelize = require("sequelize");
const database = require("./database.js");
const Paralelos = require("./Paralelos.js");
const Provincias = require("./Provincias.js");
const Etnias = require("./Etnias.js");


const Estudiantes = database.define('estudiantes',{
    id_est:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ced_est: { 
        type: Sequelize.NUMBER,
        primaryKey: true,
        unique: true,
    },
    nom_est: Sequelize.STRING,
    ape_est: Sequelize.STRING,
    nac_est: {
        type: Sequelize.INTEGER,
        references:{
            model: Provincias,
            key:'id_prov'
        },
    },
    etn_est: {
        type: Sequelize.INTEGER,
        references:{
            model: Etnias,
            key:'id_etn',
        }
    },
    dom_est: Sequelize.STRING,
    tel_est: Sequelize.STRING,
    cor_est: Sequelize.STRING,
    id_par_per: {
        type: Sequelize.INTEGER,
        references:{
            model: Paralelos,
            key: 'id_par',
      },
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Estudiantes.belongsTo(Paralelos, {foreignKey: 'id_par_per'});
Estudiantes.belongsTo(Provincias, {foreignKey: 'nac_est'});
Estudiantes.belongsTo(Etnias, {foreignKey: 'etn_est'});

module.exports = Estudiantes;