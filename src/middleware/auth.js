const jwt = require("jsonwebtoken");
const authenticate=(req,res,next)=>{
    try{
        let token=req.headers["x-auth-token"];
        if(!token)return res.status(404).send("token is required");
        
        let decodedToken=jwt.verify(token,"sweta")
        if (!decodedToken){
            return res.send({msg:"not decoded token"});
        }
        req.loggedIn=decodedToken.userId;
        next();

    }catch(err){
        res.send({msg:"Access Denied"})
    }
};
const authorise=(req,res,next)=>{
    let checkAuthorise=req.params.userId;
    if(checkAuthorise!== req.loggedIn){
        return res.status(404).send({msg:"valid user required"})

    }
    next();
}

module.exports.authenticate = authenticate
module.exports.authorise=authorise