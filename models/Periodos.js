const Sequelize = require("sequelize");
const database = require("./database.js");

const Periodos = database.define('periodos',{
    id_per: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_per: Sequelize.STRING,
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Periodos;