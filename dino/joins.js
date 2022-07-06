var Detail = require("../modules/details")
const functions = require("../common")

const routes = async (app, options) => {
    app.get('/users-detail', async function (request, reply) {
        let user = await functions.verifyToken(request,reply)
        if(user){
            Client.belongsTo(Detail,{targetKey:'detail_id_pk',foreignKey:'detail_id_fk'})
            let result = await Client.findAll({
                include: {
                    model: Detail,
                    required:true,
                    attributes:["age"]
                }
            });
            reply.send(result);
        }
        else{
            reply.send({message:"autherization was not found "})
        }
    })
    app.get('/users-detail/ljoin', async function (request, reply) {
        let user = await functions.verifyToken(request,reply)
        if(user){
            Client.belongsTo(Detail,{targetKey:'detail_id_pk',foreignKey:'detail_id_fk'})
            let result = await Client.findAll({
                include: {
                    model: Detail,
                    required: false
                }
            });
            reply.send(result);
        }
        else{
            reply.send({message:"autherization was not found "})
        }
    })
    app.get('/users-detail/rjoin', async function (request, reply) {
        let user = await functions.verifyToken(request,reply)
        if(user){
            Client.belongsTo(Detail,{targetKey:'detail_id_pk',foreignKey:'detail_id_fk'})
            let result = await Client.findAll({
                include: {
                    model: Detail,
                    right: true
                }
            });
            reply.send(result);
        }
        else{
            reply.send({message:"autherization was not found "})
        }
    })
}
module.exports=routes;