var Client = require("../models/clientModel")
var License = require("../models/licenseModel")
var Subscription = require("../models/subscriptionModel")
const { v4: uuidv4 } = require('uuid');
const routes = async (app, options) =>{
    app.get('/', async function (req, res) {
        try {
            let result = await Client.findAll().catch(e =>{res.send(`${e}`)});
            res.send(result);
        } catch (err) {
            res.send(err);  
            
        }
    });
    app.post('/insert-user', async (req, res) => {
        let data = req.body
        let status
        if(data.companyName=="" || data.Email=="" || data.Name=="" || data.fileName==""){
            status=0;
            res.send({status});
        }
        try {   
            while(true){
                let apiKey = uuidv4();
                let result =  await Client.findAll({where:{api_key: apiKey }}).catch(e =>{reply.send(`${e}`)});
                if(result.length==0){
                    if(await Client.create({company_name:data.companyName,contact_person:data.Name,file_names:data.fileName,email:data.Email, api_key:apiKey}).catch(e =>{res.send(e)}))
                    {
                        res.send({status:1})
                        break;
                    }
                }
            }
        } catch (err) {   
        res.send(err);
        } 
    });
    app.get('/add-license', async (req, res) => {
        try {
            let result = await License.findAll().catch(e =>{res.send(`${e}`)});
            res.send(result);
        } catch (err) {
            res.send(err);  
        }
    });
    app.post('/make-subs', async (req, res) => {
        let data = req.body
        let status
        if(data.clientId=="" || data.licenseId=="" || data.startDate=="" || data.endDate=="" || data.noofUsers==""){
            status=0;
            res.send({status});
        }
        else{
            try {   
                if(await Subscription.create({_kf__clientid__lsxn:data.clientId,_kf__licenseid__lsxn:data.licenseId,start_date:data.startDate,end_date:data.endDate,no_of_user:data.noofUsers,is_server:data.server}).catch(e =>{res.send(e)}))
                {res.send({status:1})}
            } catch (err) {     
            res.send(err);
            } 
        }
    });
    app.post('/update-subs', async (req, res) => {
        let data = req.body
        let status
        if(data.clientId=="" || data.licenseId=="" || data.eStartDate=="" || data.eEndDate=="" || data.eNoUsers==""){
            status=0;
            res.send({status});
        }
        else{
            try {   
            if(await Subscription.update({_kf__clientid__lsxn:data.clientId,_kf__licenseid__lsxn:data.licenseId,start_date:data.eStartDate,end_date:data.eEndDate,no_of_user:data.eNoUsers,is_server:data.server }, {where:{__kp__subsid__lsan :data.subscriptionId}}).catch(e =>{res.send(`${e}`)})){
                res.send({status:1})
            }
            }catch (err) {     
            res.send(err);
            } 
        }
    });
}
module.exports=routes;
