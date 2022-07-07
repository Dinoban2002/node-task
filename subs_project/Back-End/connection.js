const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize('project', 'rootuser', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate();
module.exports=sequelize