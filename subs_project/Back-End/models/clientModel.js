const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")

const Client = sequelize.define('client', {
    __kp__clientid__lsan : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    company_name: {
        type: DataTypes.TEXT,
        foriegnKey: true
    },
    contact_person: {
        type: DataTypes.TEXT,
    },
    file_names: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    api_key: {
        type: DataTypes.STRING,
        foriegnKey: true
    }
},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = Client