require('dotenv').config();

const Sequelize = require('sequelize');

const config = {
  username: process.env.DB_USER, 
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3307
};  

 const sequelize = new Sequelize(config);
module.exports = sequelize;
