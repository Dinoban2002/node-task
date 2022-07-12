var Authentication = require("../models/authenticationModels")
var VerifyTokens = require("../models/verifyTokenModels")
const functions = require("../common")
const { v4: uuidv4 } = require('uuid')
var resMessage = {
    retrieve: "data retrieved successfully",
    success: "login successfully",
    invalidUser:"user doesn't exist",
    invalidPass:"possword is incorrect",
    createAccount:"New created successfully",
    alreadyExist: "Username already exist",
    signOut:"signout successfully"
}
const routes = async (app, options) => {
    app.get('/', function (request, reply) {
        reply.status(200).send("log route")  
    })
    app.get('/login/users', async function (request, reply) {
        try{
            let result = await Authentication.findAll();
            reply.status(200).send({status: true,message: resMessage.retrieve, result});
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
        }
    })
    app.post('/signin', async function (request, reply) {
        let user = request.body
        let username = user.username 
        let password = user.password
            try{
                let result = await Authentication.findAll({where:{username: username }});
                if(result.length == 0){
                    reply.status(400).send({status: false, message: resMessage.invalidUser})
                }
                if(result[0].password == password){
                    await VerifyTokens.create({ user_id: result[0].user_id,user_name: result[0].username,active: "1" }).catch(e =>{reply.status(501).send({status:false,message:e.message})});
                    reply.status(200).send({status: true, message:`${result[0].username} ${resMessage.success}`})
                }else{
                    reply.status(400).send({status: false, message: resMessage.invalidPass})
                }
            }
            catch(e){
                reply.status(500).send({status: false , message: e.message})
            }
    })
    app.post('/signup', async function (request, reply) {
        let user = request.body
        let username = user.username 
        let password = user.password
        try{
            let result =  await Authentication.findAll({where:{username: username }}).catch(e =>{reply.status(501).send({status: false,message:e.message})});
            if(result.length == 0){
                while(true){
                    let apiKey = uuidv4();
                    let result =  await Authentication.findAll({where:{api_key: apiKey }}).catch(e =>{reply.status(501).send({status: false,message:e.message})});
                    if(result.length==0){
                        let result = await Authentication.create({username:username,password:password,api_key:apiKey}).catch(e =>{reply.status(501).send({status: false,message:e.message})});
                        reply.status(200).send({status: true, message: resMessage.createAccount})
                        break;
                    }
                }
            }
            else{
                reply.status(400).send({status: false, message: resMessage.alreadyExist})
            }
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
        }
    })
    app.get('/logout', async function(req, res) {
        try{
            let user_id = await functions.verifyToken(req,res)
            await VerifyTokens.update({ active: "0" }, {where:{user_id:user_id}}).catch(e =>{res.status(501).send({status: false, message:e.message})});
            res.status(200).send({status: true, message: resMessage.signOut})
        }
        catch(e){
            reply.status(500).send({status: false , message: e.message})
        }
    });
}
module.exports=routes;