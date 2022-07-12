
const { Op } = require("sequelize");
var Item = require("../models/itemsModels")
const functions = require("../common")
var Authentication = require("../models/authenticationModels")
var resMessage = {
    retrieve: "data retrieved successfully",
    inserted: "data inserted successfully",
    updated: "data updated successfully",
    deleted: "data deleted",
    nullData: "check the requested data"
}
const routes = async (app, options) => {
    app.get('/items', async function (request, reply) {
        try{
            let user = await functions.verifyToken(request,reply)
            if(user){
                let result = await Item.findAll({where:{user_id_fk:user}}).catch(e =>{reply.status(501).send({status:false, message:e.message})});
                reply.status(200).send({status: true, message: resMessage.retrieve, result});
            }
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
        }
    })
    app.get('/items/:id',async function (request, reply) {
        try{
            let user = await functions.verifyToken(request,reply)
            if(user){
                let id = request.params.id
                let result = await Item.findAll({where:{item_id_pk: id }}).catch(e =>{reply.status(501).send({status:false, message:e.message})});
                reply.status(200).send({status: true, message: resMessage.retrieve, result});
            }
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
        }
    })
    app.post('/add-items', async function (request, reply) {
        try{
            let user_id = await functions.verifyToken(request,reply)
            if(user_id){
                let user = request.body
                let name = user.name 
                let result = await Item.create({ user_id_fk: user_id,item_name: name }).catch(e =>{reply.status(501).send({status:false,message:e.message})});
                reply.status(200).send({status: true, message: resMessage.inserted, userdata:result});
            }
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
        }
    })
    app.put('/edit-items', async function (request, reply) {
        try{
            let user_id = await functions.verifyToken(request,reply)
            if(user_id){
                let user = request.body
                let id = user.id
                let name = user.name
                let result = await Item.update({ item_name: name }, {where:{[Op.and]: [{item_id_pk : id},{user_id_fk:user_id}]}}).catch(e =>{reply.status(501).send({status:false,message:e.message})});
                if(result[0]){
                    reply.status(200).send({status: true,message: `${result[0]} ${resMessage.updated}`,updated_data:{item_name:`${name}`}});
                }
            }
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
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
                    ]}}).catch(e =>{reply.status(501).send({status:false,message:e.message})});
                reply.status(200).send({status: true, message: resMessage.deleted});
            }
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
        }
    })
}
module.exports=routes;