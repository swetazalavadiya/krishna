const getInfo={
    name:": lithium",
    week:": W3D5",
    topic:": todays node js topic--how to create module and export it.",
};
function getBatchInfo(){
    console.log(`Batch name${getInfo.name}, current days${getInfo.week},current topic${getInfo.topic}`)

const today=new Date()
const day=today.getDate()
const month=today.getMonth()
const year=today.getFullYear()

console.log(day)
console.log(month)
console.log(year)
return "done"
}
module.exports.getBatchInfo=getBatchInfo