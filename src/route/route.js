const express = require('express');
const router = express.Router();
const usercontroller= require('../controller/usercontroller')
const productController=require("../controller/productController")
const cartController=require("../controller/cartController")
const orderController=require("../controller/orderController")
const {authentication,authorization}=require("../middleware/auth")
const aws= require("aws-sdk");
const { APIGateway } = require('aws-sdk');
// .................................................. Users Api ....................................................................
 router.post('/register', usercontroller.registerUser)
 router.post('/login', usercontroller.logIn)
 router.get('/user/:userId/profile', authentication,usercontroller.getUserParam)
 router.put("/user/:userId/profile",authentication,authorization,usercontroller.updateUser)


//  ..............................................Product API.........................................................
router.post("/products",productController.createProduct)

router.get("/products",productController.getAllProducts)//v
router.get("/products/:productId",productController.getDetailsFromParam)
router.put("/products/:productId",productController.updateProduct)
router.delete("/products/:productId",productController.deleteById)

//...........................................cart API.............................................................

 router.post("/users/:userId/cart",authentication,authorization,cartController.createCart)
 router.put("/users/:userId/cart",authentication,authorization,cartController.updateCart)
 router.get("/users/:userId/cart",authentication,authorization,cartController.getCartDetails)
router.delete("/users/:userId/cart",authentication,authorization,cartController.deleteCart)

// .....................................................order API .......................................................
 router.post("/users/:userId/orders",authentication,authorization, orderController.createOrder)
 router.put("/users/:userId/orders",authentication,authorization, orderController.updateOrder)


/// -------------------- AWS -----------------------------
aws.config.update({
  accessKeyId: "AKIAY3L35MCRZNIRGT6N",
  secretAccessKey: "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",
  region: "ap-south-1"
})

let uploadFile= async ( file) =>{
 return new Promise( function(resolve, reject) {
  
  let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

  var uploadParams= {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "abc/" + file.originalname, 
      Body: file.buffer
  }


  s3.upload( uploadParams, function (err, data ){
      if(err) {
          return reject({"error": err})
      }
      console.log(data)
      console.log("file uploaded succesfully")
      return resolve(data.Location)
  })

  

 })
}

router.post("/write-file-aws", async function(req, res){

  try{
      let files= req.files
      if(files && files.length>0){
          let uploadedFileURL= await uploadFile( files[0] )
          res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
      }
      else{
          res.status(400).send({ msg: "No file found" })
      }
      
  }
  catch(err){
      res.status(500).send({msg: err})
  }
  
})

//===============================router validation(For path is valid or Not)===================================================//


router.all("/*", async function (req, res) {
    return res.status(400).send({ status: false, message: "Bad reqeust / invalid Path" });
  });




module.exports=router;
