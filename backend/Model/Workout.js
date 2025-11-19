const mongoose = require("mongoose");
const {Schema} = mongoose;

const WorkoutSchema = new Schema({
userid:{type:mongoose.Schema.Types.ObjectId,ref:'User',requird:true},
category:{
    type:String,
    enum:["strength", "cardio", "flexibility"],requird:true,
},
exercisesname: { type: String, required: true },
sets: { type: Number, required: true },
reps: { type: Number, required: true },
weight: { type: Number, required: true },
notes: { type: String,},

    date: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 }, 
completed: { type: Boolean, default: false },

}, { timestamps: true });

const Workout = mongoose.model('Workout',WorkoutSchema);
module.exports = Workout;