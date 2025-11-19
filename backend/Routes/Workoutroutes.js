const express = require("express");
const router = express.Router();
const FetchUser = require("../Middleware/FetchUser");
const Workout = require("../Model/Workout");

router.post("/addworkout",FetchUser,async (req,res)=>{
    try {
        const {category,exercisesname,sets,reps,weight,notes,date} = req.body;
        
        data = new Workout({
            userid:req.user.id,
            category,
            exercisesname,
            sets,
            reps,
            weight,
            notes,
            date: new Date(date),
        })
        await data.save();  
        res.json(data)
    } catch (error) {
        console.log(error);
        
    }
})


router.get("/getworkout/:id",FetchUser,async(req,res)=>{
    try {
        const getdata = await Workout.find({userid:req.params.id});
        const today = new Date().toDateString();

        const updateworkout = await Promise.all(
            getdata.map(async (w) =>{
             if (new Date(w.date).toDateString() !== today) {
                    w.progress = 0
                    w.completed = false
                    w.date = new Date().toDateString()
                    await w.save();
                }
                return w;
            })
        )
        res.json(updateworkout); 
    } catch (error) {
        console.log(error);
        
    }
})
router.delete("/deleteworkout/:id",FetchUser,async(req,res)=>{
    try {
        let getdata = await Workout.findById(req.params.id);
         getdata = await Workout.findOneAndDelete({  _id: req.params.id});
        res.json(getdata); 
    } catch (error) {
        console.log(error);
        
    }
})
router.patch("/patchworkout/:id",FetchUser,async(req,res)=>{
    try {
        const {progress,completed} = req.body;
        let data = await Workout.findById(req.params.id);
         data = await Workout.findByIdAndUpdate({  _id: req.params.id},{progress,completed},{new:true});
        res.json(data); 
    } catch (error) {
        console.log(error);
        
    }
})



router.get("/checkworkout/:id",FetchUser,async(req,res)=>{
    try {
        const today = new Date()
        today.setHours(0,0,0,0)

        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1);

        const workout = await Workout.findOne({userid:req.params.id,date:{$gte:today,$lt:tomorrow},completed: true,})
        res.json({donetoday:!!workout})
    } catch (error) {
        console.log(error);
        
    }
})

router.get("/allworkout",FetchUser,async(req,res)=>{
    try {
        const data = await Workout.find()
        res.json(data)
    } catch (error) {
        console.log(error);
        
    }
})

router.delete("/alldeleteworkout/:id",FetchUser,async(req,res)=>{
    try {
        let data = await Workout.findById(req.params.id)
         data = await Workout.findByIdAndDelete(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error);
        
    }
})


router.put("/editworkout/:id",FetchUser,async(req,res)=>{
    try {
        const {category,exercisesname,sets,reps,weight,notes,date} = req.body;
        const newWork = {}
        if (category) {
            newWork.category = category
        }
        if (exercisesname) {
            newWork.exercisesname = exercisesname
        }
        if (sets) {
            newWork.sets = sets
        }
        if (reps) {
            newWork.reps = reps
        }
        if (weight) {
            newWork.weight = weight
        }
        if (notes) {
            newWork.notes = notes
        }
        if (date) {
            newWork.date = date
        }

        let data = await Workout.findById(req.params.id)
         data = await Workout.findByIdAndUpdate(req.params.id,{$set:newWork},{new:true})
         
         res.json(data)

    } catch (error) {
        console.log(error);
        
    }
})

module.exports = router;