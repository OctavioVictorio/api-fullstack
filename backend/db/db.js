const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('octavio_db', 'root', 'octavio123',{
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;