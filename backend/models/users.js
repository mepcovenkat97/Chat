const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name:{type:String},
   //roomId:{type:mongoose.Schema.Types.ObjectId, ref:"room",default:null},
},{
   timestamps:true
})

const User = mongoose.model("user", userSchema);
module.exports = {User}