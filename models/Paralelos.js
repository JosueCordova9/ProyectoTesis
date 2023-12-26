const Sequelize = require("sequelize");
const database = require("./database.js");
const Cursos = require("./Cursos.js");
const Periodos = require("./Periodos.js");

const Paralelos = database.define('paralelos',{
    id_par:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_par: Sequelize.STRING,
    id_cur_per: { 
        type:  Sequelize.INTEGER,
        references:{
            model: Cursos,
            key: 'id_cur',
        },
    },
    id_per_per: {
      type:  Sequelize.INTEGER,
      references:{
        model: Periodos,
        key: 'id_per',
      },
    },
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Paralelos.belongsTo(Periodos, {foreignKey: 'id_per_per'});
Paralelos.belongsTo(Cursos, {foreignKey: 'id_cur_per'});

module.exports = Paralelos;