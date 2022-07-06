
const { Op } = require("sequelize");
var Item = require("../models/itemsModels")
const functions = require("../common")
var Authentication = require("../models/authenticationModels")

const routes = async (app, options) => {
    app.get('/items', async function (request, reply) {
        try{
            let user = await functions.verifyToken(request,reply)
            if(user){
                let result = await Item.findAll({where:{user_id_fk:user}}).catch(e =>{reply.send(`${e}`)});
                reply.send(result);
            }
        }
        catch(e){
            reply.send(e)
        }
    })
    app.get('/items/:id',async function (request, reply) {
        try{
            let user = await functions.verifyToken(request,reply)
            if(user){
                let id = request.params.id
                let result = await Item.findAll({where:{item_id_pk: id }}).catch(e =>{reply.send(`${e}`)});
                reply.send(result);
            }
        }
        catch(e){
            reply.send(e)
        }
    })
    app.post('/add-items', async function (request, reply) {
        try{
            let user_id = await functions.verifyToken(request,reply)
            if(user_id){
                let user = request.body
                let name = user.name 
                let result = await Item.create({ user_id_fk: user_id,item_name: name }).catch(e =>{reply.send(`${e}`)});
                reply.send({msg:"data inserted ",userdata:result});
            }
        }
        catch(e){
            reply.send(e)
        }
    })
    app.put('/edit-items', async function (request, reply) {
        try{
            let user_id = await functions.verifyToken(request,reply)
            if(user_id){
                let user = request.body
                let id = user.id
                let name = user.name
                let result = await Item.update({ item_name: name }, {where:{[Op.and]: [{item_id_pk : id},{user_id_fk:user_id}]}}).catch(e =>{reply.send(`${e}`)});
                if(result[0]){
                    reply.send({msg:`${result[0]} data updated`,updated_data:{item_name:`${name}`}});
                }
            }
        }
        catch(e){
            reply.send(e)
        }
    })
    app.put('/delete-items', async function (request, reply) {
        try{
            let user_id = await functions.verifyToken(request,reply)
            if(user_id){
                let user = request.body
                let id = user.id
                let result = await Item.destroy({
                    where:{
                    [Op.and]: [
                        {item_id_pk : id},
                        {user_id_fk:user_id}
                    ]}}).catch(e =>{reply.send(`${e}`)});
                reply.send({msg:`data deleted`});
            }
        }
        catch(e){
            reply.send(e)
        }
    })
}
module.exports=routes;