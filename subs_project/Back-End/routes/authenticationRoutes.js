const routes = async (app, options) =>{
    app.post('/admin-user', async (req, res) => {
        let data = req.body
        let username = data.username;
        let password = data.password;
        try {
        if(username=="admin"&&password=="admin"){
            res.send({loginstatus:"1"})
        }
        if(username!="admin"&&password=="admin"){
            res.send({loginstatus:"2"})
        }
        if(username=="admin"&&password!="admin"){
            res.send({loginstatus:"3"})
        }
        if(username!="admin"&&password!="admin"){
            res.send({loginstatus:"0"})
        }
        
        } catch (err) {
        res.send(err);  
        } 
    })
}
module.exports=routes;