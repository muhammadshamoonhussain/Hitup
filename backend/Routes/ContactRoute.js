const express = require("express");
const Contact_model = require("../Model/Contact");
const FetchUser = require("../Middleware/FetchUser");
const router = express.Router();


router.post("/addcontact",async(req,res)=>{
    try {
      const {firstname,lastname,email,disscus,comment} = req.body;
      let contact = new Contact_model({
        firstname,
        lastname,
        email,
        disscus,
        comment
      })

      await contact.save()
      res.json(contact)

    } catch (error) {
        console.log(error);
        
    }
})


router.get("/getcontact",FetchUser,async(req,res)=>{
  try {
    const data = await Contact_model.find()
    res.json(data)
  } catch (error) {
    console.log(error);
    
  }
})

router.delete("/deletecontact/:id",FetchUser,async(req,res)=>{
  try {
    let data = await Contact_model.findById(req.params.id)
     data = await Contact_model.findByIdAndDelete(req.params.id)
    res.json(data)
  } catch (error) {
    console.log(error);
    
  }
})

module.exports = router;