const fastify = require('fastify')
const app = fastify()

app.register(require("./routes/authenticationRoutes"));
app.register(require("./routes/crudOperationsRoutes"));

app.listen(3009, function (err, address) {
    if (err) {
        console.error(err)
    }
})
