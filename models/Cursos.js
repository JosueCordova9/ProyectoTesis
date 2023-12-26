const Sequelize = require("sequelize");
const database = require("./database.js");
const Lectivos = require("./Lectivos.js");

const Cursos = database.define('cursos',{
    id_cur:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_cur: Sequelize.STRING,
    id_año_per: {
        type:  Sequelize.INTEGER,
        references:{
      model: Lectivos,
      key: 'id_año',
    },
    },
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Cursos.belongsTo(Lectivos,{foreignKey: 'id_año_per'});

module.exports = Cursos;