const authorModel = require("../models/newauthormodel")
const bookModel= require("../models/newbookmodel")
const publisherModel= require("../models/newpublishermodel")

const createBook= async function (req, res) {
    // const {name}=req.body
    // if (!name){
    //     return res.send("valid name is required")
    // }
    let book = req.body
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await author.find()
    res.send({data: books})
}

const getDetails = async function (req, res) {
let specificBook = await bookModel.find().populate('author').populate('publisher')
res.send({data: specificBook})
}

const putNewBook = async function (req, res) {
    let pub1 = await publisherModel.findOne({ name: "Penguin" });
    let id1 = pub1._id;
    let pub2 = await publisherModel.findOne({ name: "HarperCollins" });
    let id2 = pub2._id;
  
    let newbooks = await bookModel.updateMany(
      { publisher: [id1, id2] },
      { $set: { isHardCover: true } },
      { new: true }
    );
    let updatedbooks = await bookModel.find({ newbooks });
    res.send({ data: updatedbooks });
  };
  
  const updateRating = async function (req, res) {
    let arr1 = await publisherModel.find({ ratings: { $gt: 3.5 } });
    let newarr = [];
    for (i of arr1) {
      id = i._id;
      let tosend = await bookModel.findOneAndUpdate(
        { author_id: id },
        { $inc: { price: 10 } },
        { new: true }
      );
      newarr.push(tosend);
    }
    res.send({ mes: newarr });
  };
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getDetails = getDetails
module.exports.putNewBook = putNewBook
module.exports.updateRating = updateRating