var Authentication = require("./models/authenticationModels")
var VerifyTokens = require("./models/verifyTokenModels")
const { Op } = require("sequelize");

module.exports = {
    verifyToken: async function (req,res){
        let result = await Authentication.findAll({where:{api_key: req.headers.authorization }}).catch(e =>{res.send(`${e}`)});
        if(result.length==0){
            return res.send({message:"no authorization was foun in request headers "})
        }else{
            let verifyResult = await VerifyTokens.findAll({where:{[Op.and]: [{user_id : result[0].user_id},{active:"1"}]}}).catch(e =>{res.send(`${e}`)});
            if(verifyResult.length==0){
            return res.send({message:"wrong autherization"})
            }
            return result[0].user_id
        }
    }
};
