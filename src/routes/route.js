const express = require('express');
//const abc = require('../introduction/intro')
const router = express.Router();

let movies=["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
// router.get('/movies',function(req,res){
// console.log(movies)
// res.send(movies)
// ""
// })
// router.get('/movies/:indexNumber',function(req,res){
// let index = req.params.indexNumber
// console.log(movies[index])  
// res.send(movies[index])
// })


let films=[ {
    'id': 1,
 'name': 'The Shining'
   }, {
    'id': 2,
    'name': 'Incendies'
   }, {
    'id': 3,
    'name': 'Rang de Basanti'
   }, {
    'id': 4,
    'name': 'Finding Nemo'
   }]
// router.get('/films', function(req,res){
// console.log(films)
// res.send(films)
// })
router.get('/films/:filmid',function(req,res){
    let filmid = req.params.filmid
    if (filmid>films.length){
        console.log("No movie exists with this id")
        res.send("No movie exists with this id")
    }
    else{
        console.log(films[filmid])
        res.send(films[filmid])
    }
})
module.exports = router;
