const fastify = require('fastify')
const app = fastify()

app.register(require("./routes/authenticationRoutes"));
app.register(require("./routes/crudOperationsRoutes"));

app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server' listening on ${address}`)
})