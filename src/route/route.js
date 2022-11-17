const express= require('express')
const router = express.Router();
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware = require("../middleware/middleware")


router.get("/test-me", function(req, res){
    console.log("hi sweta")
    res.status(200).send({msg:"welcome"})
})

// 63750b5c996bb00d30ee668d
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1MGI1Yzk5NmJiMDBkMzBlZTY2OGQiLCJiYXRjaCI6InByb2plY3QtMSIsIm1hZGVCeSI6InNoeWFtIiwiaWF0IjoxNjY4NjE1MDQ5fQ.SWlbDthjfxMwks0aB_nmTFg5FnwHp_MZjkjQKUHkWhY

router.post('/authors', authorController.createAuthor)    //author create


////1
router.post('/blog',middleware.authentication, blogController.createBlog) //blogs create


////2
router.get('/blogData/:blogId',middleware.authentication, blogController.getblogData) // no id only use query param

///3
router.put('/blogs/:blogid',middleware.authentication,middleware.authorization,blogController.update) // 


///4

router.put('/blog/:blogid', middleware.authorization,blogController.blogsDeleted) //blogsdelet



//5
router.put('/blogss',middleware.authentication, blogController.blogsdetails) // blogs details


router.post('/login',authorController.login)

module.exports = router;