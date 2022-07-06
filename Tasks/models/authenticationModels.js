const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")

const Authentication = sequelize.define('authentications', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    api_key: {
        type: DataTypes.STRING,
        
    }
},
{
    timestamps: false
});

module.exports=Authentication