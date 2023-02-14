const express = require("express")
const cron = require("node-cron")
const router = express.Router()

cron.schedule('* * * * *', () => {
    check();
  });

let Event = [
    {
        text: "textOne",
        dateTime: "2020-07-10 23:00:00.000"
    },
    {
        text: "textTwo",
        dateTime: "2023-02-14 8:11:00.000"
    },
    {
        text: "textThree",
        dateTime: "2023-02-14 8:11:00.000"
    },
    {
        text: "textFour",
        dateTime: "2020-07-10 14:00:00.000"
    },
    {
        text: "textFive",
        dateTime: "2020-07-10 16:00:00.000"
    },
    {
        text: "textSix",
        dateTime: "2020-07-10 17:00:00.000"
    },
    {
        text: "textSeven",
        dateTime: "2020-07-10 18:00:00.000"
    },
    {
        text: "textEight",
        dateTime: "2020-07-10 19:00:00.000"
    },
    {
        text: "textNine",
        dateTime: "2020-07-10 11:00:00.000"
    },
    {
        text: "textTen",
        dateTime: "2020-07-10 10:00:00.000"
    }
]


function dateToString(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dateOfString = date.getFullYear() + "-";
    dateOfString += (("" + month).length < 2 ? "0" : "") + month + "-";
    dateOfString += (("" + day).length < 2 ? "0" : "") + day + " ";
    return dateOfString;
}


const check = async (req,res)=>{
    try {
        var currentdate = new Date();
        var currdatetime = dateToString(currentdate);
        currdatetime += currentdate.getHours() + ":";
        currdatetime += currentdate.getMinutes() + ":"
        + "00.000"
        
    Event.map((data)=>{
    if(data.dateTime==currdatetime){
        ReverseText(data.text)
    }
    })
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}


const ReverseText = (text)=>{
    try {
        const len = text.length
        let newtext = ""
        setTimeout(()=>{
            for(let i=len-1;i>=0;i--){
                newtext+=text[i]
            }
            console.log({newtext})
        },len*1000)

    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}


router.get('/schedule', check)

module.exports = router