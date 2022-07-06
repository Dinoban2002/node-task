var Authentication = require("../models/authenticationModels")
var VerifyTokens = require("../models/verifyTokenModels")
const functions = require("../common")

const { v4: uuidv4 } = require('uuid');
const routes = async (app, options) => {
    app.get('/', function (request, reply) {
        reply.send("log route")  
    })
    app.get('/login/users', async function (request, reply) {
        try{
            let result = await Authentication.findAll();
            reply.send(result);
        }
        catch(e){
            reply.send(e)
        }
    })
    app.post('/signin', async function (request, reply) {
        let user = request.body
        let username = user.username 
        let password = user.password
            try{
                let result = await Authentication.findAll({where:{username: username }});
                if(result.length==0){
                    reply.send({msg:"user doesn't exist"})
                }
                if(result[0].password==password){
                    await VerifyTokens.create({ user_id: result[0].user_id,user_name: result[0].username,active: "1" }).catch(e =>{reply.send(`${e}`)});
                    reply.send({msg:`${result[0].username},logged in successfully`})
                }else{
                    reply.send({msg:"password is in correct"})
                }
            }
            catch(e){
                reply.send(e)
            }
    })
    app.post('/signup', async function (request, reply) {
        let user = request.body
        let username = user.username 
        let password = user.password
        try{
            let result =  await Authentication.findAll({where:{username: username }}).catch(e =>{reply.send(`${e}`)});
            if(result.length==0){
                while(true){
                    let apiKey = uuidv4();
                    let result =  await Authentication.findAll({where:{api_key: apiKey }}).catch(e =>{reply.send(`${e}`)});
                    if(result.length==0){
                        let result = await Authentication.create({username:username,password:password,api_key:apiKey}).catch(e =>{reply.send(e)});
                        reply.send({msg:"account created successfully",result})
                        break;
                    }
                }
            }
            else{
                reply.send({msg:"username already exist!"})
            }
        }
        catch(e){
            reply.send(e)
        }
    })
    app.get('/logout', async function(req, res) {
        try{
            let user_id = await functions.verifyToken(req,res)
            await VerifyTokens.update({ active: "0" }, {where:{user_id:user_id}}).catch(e =>{res.send(`${e}`)});
            res.send({message:"signout successfully"})
        }
        catch(e){
            reply.send(e)
        }
    });
}
module.exports=routes;