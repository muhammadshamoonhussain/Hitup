const express = require("express");
const FetchUser = require("../Middleware/FetchUser");
const notify = require("../Model/Notification");
const router = express.Router();


router.post("/addnotify",FetchUser,async(req,res)=>{
try {
    const {message,type,date} = req.body;
    const notfi = await notify.create({
        userid:req.user.id,
        message,
        type,
        date,
    })
    await notfi.save()
    res.json(notfi)
} catch (error) {
    console.log(error);
    
}
})


router.get("/getnotify/:id",FetchUser,async(req,res)=>{
    try {
        const notifi = await notify.find({userid:req.params.id});
        res.json(notifi)
    } catch (error) {
        console.log(error);
                
    }
})
router.patch("/readnotifi/:id",FetchUser,async(req,res)=>{
    try {
        const notifi = await notify.findByIdAndUpdate({userid:req.params.id},{isRead:true});
        res.json({notifi,success:true})
    } catch (error) {
        console.log(error);
                
    }
})


module.exports = router;