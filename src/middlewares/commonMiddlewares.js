const myOrderMiddleware = function(req, res, next){
    let isFreeAppUser = req.headers["isfreeappuser"]
    if(!isFreeAppUser){
        return res.send("Please Provides Header")
    }
    else{
        if(req.headers["isfreeappuser"]==='true'){
            req.body.isFreeAppUser = true
        }
        else if(req.headers["isfreeappuser"]==='false' ){
            req.body.isFreeAppUser = false
        }
        next()
    }
}
module.exports.myOrderMiddleware = myOrderMiddleware
