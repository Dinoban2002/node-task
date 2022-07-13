
const { Op } = require("sequelize");
var Item = require("../models/itemsModels")
const functions = require("../common")
var Authentication = require("../models/authenticationModels")
var resMessage = require("../validation")
const routes = async (app, options) => {
    app.get('/items', async function (request, reply) {
        try{
            let user = await functions.verifyToken(request,reply)
            if(user){
                let result = await Item.findAll({where:{user_id_fk:user}})
                if(result.length > 0){
                    res.status(200).send({status: true,message: resMessage.retrieve, result})
                }else{
                    res.status(501).send({status: false , message: resMessage.no_data}) 
                }
            }else{ return }
        }
        catch(e){
            reply.status(501).send({status: false , message: e.message})
        }
    })
    app.get('/items/:id',async function (request, reply) {
        try{
            let user = await functions.verifyToken(request,reply)
            if(user){
                let id = request.params.id
                if(id){
                    let result = await Item.findAll({where:{item_id_pk: id }})
                    if(result.length > 0){
                        res.status(200).send({status: true,message: resMessage.retrieve, result})
                    }else{
                        res.status(501).send({status: false , message: resMessage.no_data}) 
                    }
                }else{
                    res.status(501).send({status: false , message: resMessage.invalidData})
                }
            }else{ return }
        }
        catch(e){
            reply.status(501).send({status: false , message: e.message})
        }
    })
    app.post('/add-items', async function (request, reply) {
        try{
            let user_id = await functions.verifyToken(request,reply)
            if(user_id){
                let user = request.body
                let name = user.name 
                if(user.name){
                    let result = await Item.create({ user_id_fk: user_id,item_name: name })
                    if(result){
                        res.status(200).send({status: true, message: resMessage.inserted, userdata:result})
                    }else{
                        res.status(501).send({status: false , message: resMessage.queryFail})
                    }
                }else{
                    res.status(501).send({status: false , message: resMessage.invalidData})
                }
            }else{ return }
        }
        catch(e){
            reply.status(501).send({status: false , message: e.message})
        }
    })
    app.put('/edit-items', async function (request, reply) {
        try{
            let user_id = await functions.verifyToken(request,reply)
            if(user_id){
                let user = request.body
                let id = user.id
                let name = user.name
                if(user.name){
                    let result = await Item.update({ item_name: name }, {where:{[Op.and]: [{item_id_pk : id},{user_id_fk:user_id}]}})
                    if(result[0]){
                        reply.status(200).send({status: true,message: `${result[0]} ${resMessage.updated}`,updated_data:{item_name:`${name}`}});
                    }else{
                        res.status(501).send({status: false, message: resMessage.not_updated})
                    }
                }else{
                    res.status(501).send({status: false , message: resMessage.invalidData})
                }
            }else{ return }
        }
        catch(e){
            reply.status(501).send({status: false , message: e.message})
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
                    ]}})
                reply.status(200).send({status: true, message: resMessage.deleted});
            }else{ return }
        }
        catch(e){
            reply.status(501).send({status: false , message: e.message})
        }
    })
}
module.exports=routes;