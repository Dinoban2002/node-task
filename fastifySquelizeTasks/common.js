var Authentication = require("./models/authenticationModels")
var VerifyTokens = require("./models/verifyTokenModels")
const { Op } = require("sequelize");

module.exports = {
    verifyToken: async function (req,res){
        try{
            let result = await Authentication.findAll({where:{api_key: req.headers.authorization }})
            if(result.length==0){
                return res.send({message:"no authorization was found in request headers "})
            }else{
                let verifyResult = await VerifyTokens.findAll({where:{[Op.and]: [{user_id : result[0].user_id},{active:"1"}]}})
                if(verifyResult.length==0){
                return res.send({message:"wrong autherization"})
                }
                return result[0].user_id
            }
        }catch(e){
            reply.status(501).send({status: false , message: e.message})
        }
    }
};
