const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")

const Subscription = sequelize.define('subsciption', {
    __kp__subsid__lsan  : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    _kf__clientid__lsxn: {
        type: DataTypes.INTEGER,
        foriegnKey: true
    },
    _kf__licenseid__lsxn: {
        type: DataTypes.INTEGER,
        foriegnKey: true
    },
    start_date : {
        type: DataTypes.DATE,
    },
    end_date : {
        type: DataTypes.DATE,
    },
    no_of_user: {
        type: DataTypes.INTEGER,
    },
    is_server:{
        type: DataTypes.INTEGER
    }
},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = Subscription