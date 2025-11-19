const mongoose = require("mongoose");
const {Schema} = mongoose;

const notifySchema = new Schema({
userid:{type:mongoose.Schema.Types.ObjectId,ref:'User',requird:true},
message:{type:String,required:true},
type:{type:String,default:"Workout"},
isRead: {type: Boolean,default: false,},
date: { type: Date, default: Date.now },


}, { timestamps: true });

const notify = mongoose.model('Notification',notifySchema);
module.exports = notify;