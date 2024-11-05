const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();

// Carga la URL de conexión de las variables de entorno
const databaseUrl = process.env.DATABASE_URL;

// Crea la conexión con Sequelize usando la URL de conexión
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Esto puede ser necesario para conexiones en la nube
    },
  },
});

module.exports = sequelize;
