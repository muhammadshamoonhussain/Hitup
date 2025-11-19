const mongoose = require("mongoose")
const {Schema} = mongoose


const NutritionSchema = new Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'User',requird:true},
    category:{
        type:String,
        enum:["breakfast","lunch","dinner","snacks"],requird:true,
    },
    foodname:{type:String,require:true},
    quantity:{type:Number,require:true},
    calories:{type:Number,require:true},
    protein:{type:Number,require:true},
    carbs:{type:Number,require:true},
    fats:{type:Number,require:true},
    date:{type:Date,default:Date.now}
},{timestamps:true})

const Nutrition = mongoose.model("Nutrition",NutritionSchema);
module.exports = Nutrition;