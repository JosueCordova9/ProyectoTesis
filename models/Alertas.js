const Sequelize = require("sequelize");
const database = require('./database');
const Estudiantes = require("./Estudiantes");

const Alertas = database.define("alertas",{
    id_ale:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_est:{
        type:  Sequelize.INTEGER,
        references:{
            model: Estudiantes,
            key: 'id_est'
            },
    },
    ced_est: Sequelize.STRING,
    des_ale: Sequelize.STRING,
    nom_ale: Sequelize.STRING,
    ape_ale: Sequelize.STRING,
    car_ale: Sequelize.STRING,
    con_ale: Sequelize.STRING,
    fec_ale: Sequelize.DATE
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Alertas.belongsTo(Estudiantes, {foreignKey: 'id_est'});
module.exports = Alertas;