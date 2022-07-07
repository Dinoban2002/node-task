const fastify = require('fastify')
const app = fastify()

app.register(require("./Back-End/routes/clientSubsRoutes"));
// app.register(require(""));

app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server' listening on ${address}`)
})