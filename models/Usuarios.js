const Sequelize = require('sequelize');
const database = require('./database.js');
const Roles = require("./Roles.js");

const Usuarios = database.define('usuarios', {
  id_usu: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario: Sequelize.STRING,
  nom_usu: Sequelize.STRING,
  ape_usu: Sequelize.STRING,
  con_usu: Sequelize.STRING,
  id_rol_per: {
    type: Sequelize.INTEGER,
    references: {
      model: Roles,
      key: 'id_rol',
    },
  },
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});


Usuarios.belongsTo(Roles, { foreignKey: 'id_rol_per' });

module.exports = Usuarios;