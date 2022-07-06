const fastify = require('fastify')
const request = require('request')
const app = fastify()
var con = require("./connection")

// Set a GET route "/"
// app.get('/', function (request, reply) {
//     con.connect(function(err) {
//         if (err) 
//             throw err;
//         else{
//             con.query("SELECT * FROM client", function (err, result, fields) {
//                 if (err) throw err;
//                 console.log(result);
//                 reply.send(result);
//                 // con.end();
//             });
//         }
//         // if (con) return con.end();
//     });
// })

con.connect(function(err) {
    if (err) 
        throw err;
    else{
        console.log("connected ")
    }
});
app.get('/', function (request, reply) {
    reply.send("Our first route")
})
app.get('/users', function (request, reply) {
    
    con.query("SELECT * FROM client", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        reply.send(result);

    });
})
app.get('/users/:id', function (request, reply) {
    let id = request.params.id
    console.log(id)
    con.query("SELECT * FROM client WHERE id='"+id+"'",  function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        reply.send(result);
    });
})
app.post('/add-users', function (request, reply) {
    let user = request.body
    let name = user.name 
    var sql = "INSERT INTO client (name) VALUES ('"+name+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})
app.put('/edit-users', function (request, reply) {
    // let userId = request.params.userId
    let user = request.body
    let id = user.id
    let name = user.name
    var sql = "UPDATE client SET name ='"+name+"' WHERE id='"+id+"' ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(name,id,user)
        console.log(result.affectedRows + " record(s) updated");
    })
})
app.put('/delete-users', function (request, reply) {
    // let userId = request.params.userId
    let user = request.body
    let id = user.id
    var sql = "DELETE FROM client WHERE id='"+id+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
})
//join queries
app.get('/users-detail', function (request, reply) {
    var sql = "SELECT client.name AS user_name, details.age AS user_age FROM client JOIN details ON client.detail = details.id";
    con.query(sql , function (err, result, fields) {
        if (err) throw err;
        reply.send(result);
    });
})
app.get('/users-detail/ljoin', function (request, reply) {
    var sql = "SELECT client.name AS user_name, details.age AS user_age FROM client LEFT JOIN details ON client.detail = details.id";
    con.query(sql , function (err, result, fields) {
        if (err) throw err;
        reply.send(result);
    });
})
app.get('/users-detail/rjoin', function (request, reply) {
    var sql = "SELECT client.name AS user_name, details.age AS user_age FROM client RIGHT JOIN details ON client.detail = details.id";
    con.query(sql , function (err, result, fields) {
        if (err) throw err;
        reply.send(result);
    });
})
app.get('/users-detail/sjoin', function (request, reply) {
    var sql = "SELECT d1.city AS city1,d2.city AS citty2,d1.age FROM details d1,details d2 WHERE d1.id<>d2.id AND d1.age=d2.age";
    con.query(sql , function (err, result, fields) {
        if (err) throw err;
        reply.send(result);
    });
})


// Start the server
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})