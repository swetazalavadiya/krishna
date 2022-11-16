const express= require('express')
const router = express.Router();
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")

router.get("/test-me", function(req, res){
    console.log("hi sweta")
    res.status(200).send({msg:"welcome"})
})

router.post('/authors', authorController.createAuthor)
router.post('/blogs', blogController.createBlog)
router.get('/blogs', blogController.getblogData)
router.put('/blogs/:blogid', blogController.update)
router.put('/blog/:blogid', blogController.blogsDeleted)
router.put('/blogss', blogController.blogsdetails)

module.exports = router;