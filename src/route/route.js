const express= require('express')
const router = express.Router();
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware = require("../middleware/middleware")

router.get("/test-me", function(req, res){
    console.log("hi sweta")
    res.status(200).send({msg:"welcome"})
})

router.post('/authors', authorController.createAuthor) 

router.post('/login',authorController.login)   

router.post('/blog',middleware.authentication, blogController.createBlog) 

router.get('/blogData/:blogId',middleware.authentication, blogController.getblogData) 
 
router.put('/blogs/:blogid',middleware.authentication,middleware.authorization,blogController.update)

router.put('/blog/:blogid',middleware.authentication, middleware.authorization,blogController.blogsDeleted) 

router.put('/blogss',middleware.authentication, middleware.authorization,blogController.blogsdetails) 

module.exports = router;