const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
   name:{type:String},
   totalUsers:{type:Number, default:0},
},{
   timestamps:true
})

const Room = mongoose.model("room", roomSchema);
module.exports = {Room}