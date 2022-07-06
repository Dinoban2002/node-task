const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize('example', 'rootuser', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
const Client = sequelize.define('clients', {
    client_id_pk : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    },

},
{
    timestamps: false
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
}catch (error) {
    console.error('Unable to connect to the database:', error);
}
const fastify = require('fastify')
const app = fastify()

app.get('/', async (request, reply) => {
    let result = await Client.findAll();
    reply.send(result);
})

app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server' listening on ${address}`)
})