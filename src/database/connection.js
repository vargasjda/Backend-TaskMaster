const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();


const sequelize  = new Sequelize(
  process.env.DB_NAME,        // Nombre de la base de datos
  process.env.DB_USER,        // Usuario de la base de datos
  process.env.DB_PASSWORD,    // Contraseña de la base de datos
  {
    host: process.env.DB_HOST,     // Host de la base de datos
    port: process.env.DB_PORT,     // Puerto de la base de datos
    dialect: 'mysql',              // El tipo de base de datos que estamos usando
    logging: false,                // Desactivar logs, si es necesario
  }
);

module.exports = sequelize;