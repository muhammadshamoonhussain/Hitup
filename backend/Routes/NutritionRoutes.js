const express = require("express");
const FetchUser = require("../Middleware/FetchUser");
const Nutrition = require("../Model/Nutrition");
const router = express.Router();


router.post("/addnutrition",FetchUser,async(req,res)=>{
    try {
        const {category,foodname,quantity,calories,protein,carbs,fats,date} = req.body;

        const data = new Nutrition({
            userid:req.user.id,
            category,
            foodname,
            quantity,
            calories,
            protein,
            carbs,
            fats,
            date:new Date(date)
        })
        await data.save();
        res.json(data)
    } catch (error) {
        console.log(error);
        
    }
})


router.get('/getnutrition/:id',FetchUser,async(req,res)=>{
    try {
        const getdata = await Nutrition.find({userid:req.params.id})
        res.json(getdata)
    } catch (error) {
        console.log(error);
        
    }
})

router.delete('/deletenutrition/:id',FetchUser,async(req,res)=>{
    try {
        let getdata = await Nutrition.findById(req.params.id)
        getdata = await Nutrition.findOneAndDelete({_id:req.params.id});
        res.json(getdata)
    } catch (error) {
        console.log(error);
        
    }
})

router.get('/getallnutrition',FetchUser,async(req,res)=>{
    try {
        const getdata = await Nutrition.find()
        res.json(getdata)
    } catch (error) {
        console.log(error);
        
    }
})


router.delete('/alldeletenutrition/:id',FetchUser,async(req,res)=>{
    try {
        let getdata = await Nutrition.findById(req.params.id)
        getdata = await Nutrition.findOneAndDelete(req.params.id);
        res.json(getdata)
    } catch (error) {
        console.log(error);
        
    }
})
router.put('/editnutrition/:id',FetchUser,async(req,res)=>{
    try {
        const {category,foodname,quantity,calories,protein,carbs,fats,date} = req.body;
        const newNut = {}
        if(category){
        newNut.category = category
        }
        if(foodname){
        newNut.foodname = foodname
        }
        if(quantity){
        newNut.quantity = quantity
        }
        if(calories){
        newNut.calories = calories
        }
        if(protein){
        newNut.protein = protein
        }
        if(carbs){
        newNut.carbs = carbs
        }
        if(fats){
        newNut.fats = fats
        }
        if(date){
        newNut.date = date
        }
        let getdata = await Nutrition.findById(req.params.id)
        getdata = await Nutrition.findByIdAndUpdate(req.params.id,{$set:newNut},{new:true});
        res.json(getdata)
    } catch (error) {
        console.log(error);
        
    }
})


module.exports = router