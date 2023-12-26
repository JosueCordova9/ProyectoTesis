const Sequelize = require("sequelize");
const database = require("./database");
const Alertas = require("./Alertas");
const Usuarios = require("./Usuarios");

const Observaciones = database.define("estudiantes_observaciones",{
    id_obs:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_ale_per: { 
        type: Sequelize.STRING,
        references:{
            model: Alertas,
            key: 'id_ale'
        }
    },
    observacion: Sequelize.STRING,
    fec_obs: Sequelize.DATE,
    id_usu:{
        type: Sequelize.INTEGER,
        references:{
            model: Usuarios,
            key: 'id_usu'
        }
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Observaciones.belongsTo(Alertas,{foreignKey:"id_ale_per"});
Observaciones.belongsTo(Usuarios,{foreignKey:"id_usu"});
module.exports = Observaciones;