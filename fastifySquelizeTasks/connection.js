const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize('example', 'rootuser', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err.message);
});
module.exports=sequelize