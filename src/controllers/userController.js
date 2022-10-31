const basicCode= async function(req, res) {
    console.log( "Assignment is done")
    res.send({ msg: "congratulations sweta..! Your assignment is completes."})
    }
module.exports.newcode = basicCode



















const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.basicCode= basicCode