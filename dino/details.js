const { Sequelize,DataTypes } = require('sequelize');
var sequelize = require("../connection")
const Detail = sequelize.define('details', {
    detail_id_pk : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id_fk: {
        type: DataTypes.INTEGER,
        foriegnKey: true
    },
    age: {
        type: DataTypes.INTEGER,
    },
    city: {
        type: DataTypes.STRING
    }
},
{
    timestamps: false
});

module.exports=Detail


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
                let headerUserid = await Authentication.findAll({where:{api_key: request.headers.authorization }}).catch(e =>{reply.send(`${e}`)});
                if(headerUserid[0].user_id==result[0].user_id){
                    await VerifyTokens.create({ user_id: result[0].user_id,user_name: result[0].username,active: "1" }).catch(e =>{reply.send(`${e}`)});
                    reply.send({msg:`${result[0].username},logged in successfully`})
                }
                reply.send({message:"authorization key and signin id or different "})
            }else{
                reply.send({msg:"password is in correct"})
            }
        }
        catch(e){
            reply.send(e)
        }
})