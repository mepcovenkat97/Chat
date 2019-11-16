const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
   message:{type:String},
   userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
   replyId:{type:mongoose.Schema.Types.ObjectId, ref:"message"},
},{
   timestamps:true
})

const Message = mongoose.model("message", messageSchema);
module.exports = {Message}