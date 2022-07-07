const fastify = require('fastify')
const app = fastify()

app.register(require("./routes/clientSubsRoutes"));
app.register(require("./routes/authenticationRoutes"));
app.register(require('fastify-cors'), {origin: "http://localhost:3000",
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ['Content-Type', 'Authorization'] });
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server' listening on ${address}`)
})