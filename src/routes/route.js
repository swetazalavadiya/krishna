const express = require('express');
//const abc = require('../introduction/intro')
const router = express.Router();

//let movies=["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
//router.get('/movies',function(req,res){
//console.log(movies)
//res.send(movies)
//})
// router.get('/movies/:indexNumber',function(req,res){
// let index = req.params.indexNumber
// console.log(movies[index])  
// res.send(movies[index])
// })


// let films=[ {
//     'id': 1,
//  'name': 'The Shining'
//    }, {
//     'id': 2,
//     'name': 'Incendies'
//    }, {
//     'id': 3,
//     'name': 'Rang de Basanti'
//    }, {
//     'id': 4,
//     'name': 'Finding Nemo'
//    }]
// // router.get('/films', function(req,res){
// // console.log(films)
// // res.send(films)
// // })
// router.get('/films/:filmid',function(req,res){
//     let filmid = req.params.filmid
//     if (filmid>films.length){
//         console.log("No movie exists with this id")
//         res.send("No movie exists with this id")
//     }
//     else{
//         console.log(films[filmid])
//         res.send(films[filmid])
//     }
//})
router.get("/sol1", function (req, res) {
    let array=[1,2,3,5,6,7]
    let n=array.length+1 
    let sumOfnaturalNumber =n*(1+7)/2
    let sumOfarray=0
    for(let i=0;i<array.length;i++){
        let element = array[i]
        sumOfarray+=element
    }
    let result = sumOfnaturalNumber-sumOfarray
    console.log({missingNumber:result})
    res.send( {missingNumber:result});
    });

    router.get("/sol2", function (req, res) {
        let arr= [33, 34, 35, 37, 38]
        let n=arr.length+1 
        let sumOfnaturalNumber =n*(33+38)/2  //logic : sum of n consecutive numbers is [ n * (first + last) / 2 ]..so get sum of all
        let sumOfarray=0
        for(let i=0;i<arr.length;i++){
            let element = arr[i]
            sumOfarray+=element
        }
        let result = sumOfnaturalNumber-sumOfarray
        console.log({missingNumber:result})
        res.send({missingNumber:result});
        });

module.exports = router;
