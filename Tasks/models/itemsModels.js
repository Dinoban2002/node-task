const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")

const Item = sequelize.define('items', {
    item_id_pk : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id_fk: {
        type: DataTypes.INTEGER,
        foriegnKey: true
    },
    item_name: {
        type: DataTypes.STRING,
    }
},
{
    timestamps: false
});

module.exports = Item