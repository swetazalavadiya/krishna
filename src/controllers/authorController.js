

const createAuthor = async function(req,res){
    let data = req.body
    let savedAuthor = await authorModel.create(data)
    res.send({msg : savedAuthor})
}







module.exports.createAuthor = createAuthor
