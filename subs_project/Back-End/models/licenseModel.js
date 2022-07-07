const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")

const License = sequelize.define('license', {
    __kp__licenseid__lsan  : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    component: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    expire_month : {
        type: DataTypes.STRING,
    },
    renewal_n_day: {
        type: DataTypes.INTEGER,
    },
    license_key:{
        type: DataTypes.STRING
    },
    version :{
        type: DataTypes.STRING
    }
},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = License