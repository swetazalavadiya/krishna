
const createCard = async (req, res)=>{
    try{

    let data = req.body
    let { cardNumber, cardType , customerName , vision , customerID ,  table } = data

    return res.status(500).send({status : true, msg : "created successfully",data : data})
    
    }catch(err)
    {
        return res.status(500).send({status : false , message : err.message})
    }
}