const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;
