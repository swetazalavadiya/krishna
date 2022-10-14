const express = require('express');
const router = express.Router();///test-you
//importing a custom module
//const xyz = require('./logger')
//importing external package
//const underscore = require('underscore')
const wel= require('../logger/logger.js')
const help=require('../util/helper.js')
const formate=require('../validator/formatter.js')
const lodash=require('../lodash/lodash.js')

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    //console.log("Calling my function ",xyz.welcome())
    //console.log("The value of the constant is ",xyz.myUrl)
    //Trying to use an external package called underscore
    //let myArray = ['Akash', 'Pritesh', 'Sabiha']
    //let result = underscore.first(myArray)
    //console.log("The result of underscores examples api is : ", result)
    console.log(wel.welcome())
    console.log(help.getBatchInfo())
    console.log(formate.format())
    console.log(lodash.lodash())
    res.send('My first ever api!')

    //To be tried what happens if we send multiple response
    //res.send('My second api!')
});

module.exports = router;

