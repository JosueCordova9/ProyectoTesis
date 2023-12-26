const Sequelize = require("sequelize");
const database = require("./database.js");

const Lectivos = database.define('año_lectivos',{
    id_ano: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_año: Sequelize.STRING,
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Lectivos;