const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")

const VerifyTokens = sequelize.define('verifyTokens', {
    vt_id_pk : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    user_name: {
        type: DataTypes.STRING
    },
    active:{
        type:DataTypes.TINYINT
    }
},
{
    timestamps: false
});

module.exports = VerifyTokens