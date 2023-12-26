const Sequelize = require("sequelize");
const database = require("./database");
const Estudiantes = require("./Estudiantes");

const Representantes = database.define('representantes',{
    id_rep:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_est: {
        type:Sequelize.INTEGER,
        references: {
            model: Estudiantes,
            key: 'id_est'
        }
    },
    ced_est_rep:Sequelize.STRING,
    //Madre
    ced_mad: Sequelize.STRING,
    nom_mad: Sequelize.STRING,
    ape_mad: Sequelize.STRING,
    ins_mad: Sequelize.STRING,
    ocu_mad: Sequelize.STRING,
    lug_tra_mad: Sequelize.STRING,
    tel_mad: Sequelize.STRING,
    //Padre
    ced_pad: Sequelize.STRING,
    nom_pad: Sequelize.STRING,
    ape_pad: Sequelize.STRING,
    ins_pad: Sequelize.STRING,
    ocu_pad: Sequelize.STRING,
    lug_tra_pad: Sequelize.STRING,
    tel_pad: Sequelize.STRING,
    //Representante
    ced_rep: Sequelize.STRING,
    nom_rep: Sequelize.STRING,
    ape_rep: Sequelize.STRING,
    par_rep: Sequelize.STRING,
    ocu_rep: Sequelize.STRING,
    lug_tra_rep: Sequelize.STRING,
    tel_rep: Sequelize.STRING,

},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Representantes.belongsTo(Estudiantes,{foreignKey:"id_est"});
module.exports = Representantes;