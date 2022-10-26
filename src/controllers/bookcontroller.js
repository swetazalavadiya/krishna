const bookcontroller=require('../models/bookmodel')

const createbook=async function(req,res){
    let data=req.body;
    let saveData=await bookcontroller.create(data)
    res.send({print: saveData})
}
const getbook= async function(req,res){
    const bookdata={
      $or:[{"prices.indianprice":{$gt:"500 inr"},"stockAvailable":"true"}]
    }
    let book=await bookcontroller.find(bookdata).select()
    res.send({print:book})
}
module.exports.createbook= createbook
module.exports.getbook= getbook