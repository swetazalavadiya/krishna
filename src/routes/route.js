const bodyParser = require('body-parser');
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
// const express = require('express');
 
let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]
 
   router.post('/players', function (req, res) {
    const body=req.body
    const player= players.find(x=>x.name === body.name)
      if (player){
        console.log({message:"player already exist"})
        return res.send({message:"player already exist"})
      } else{
        players.push(body)
        console.log(players)
        return res.send(players)
      }
   })

//    let persons= [
//     {
//     name: "PK",
//     age: 10,
//     votingStatus: false
//  },
//  {
//     name: "SK",
//     age: 20,
//     votingStatus: false
//  },
//  {
//     name: "AA",
//     age: 70,
//     votingStatus: false
//  },
//  {
//     name: "SC",
//     age: 5,
//     votingStatus: false
//  },
//  {
//     name: "HO",
//     age: 40,
//     votingStatus: false
//  }
//  ]
//    router.post('/person',function(req,res){
//     const votingAge=req.query.votingAge

//     const updatedPersons =[]
//     persons.forEach((person) => {
//         if(person.age>votingAge){
//             person.votingStatus=true
//             updatedPersons.push(person)
//         }
//     });
//     return res.send({updatedPersons:updatedPersons})
// })
module.exports = router;
