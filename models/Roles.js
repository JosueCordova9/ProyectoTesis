const Sequelize = require("sequelize");
const database = require("./database.js");

const Roles = database.define('roles',{
    id_rol: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_rol: Sequelize.STRING,
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Roles;
