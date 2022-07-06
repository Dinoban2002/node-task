const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize('example', 'rootuser', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate();
module.exports=sequelize