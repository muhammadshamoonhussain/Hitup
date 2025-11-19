const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Upload = require("../Middleware/UploadImage");
const User = require("../Model/User");
const FetchUser = require("../Middleware/FetchUser");
const secret_token = "secret_token";

router.post("/register", Upload.single("image"), async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        error: "Sorry a user with this email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashpassword,
      image: req.file ? req.file.filename : null,
      role: "user",
      gender: req.body.gender,
     
    });

    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const authtoken = jwt.sign(data, secret_token);
    res.json({ success: true, authtoken });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      return res.status(400).json({ error: "Please enter correct password" });
    }
       const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const authtoken = jwt.sign(data, secret_token);
    res.json({success:true,authtoken,id:user.id,role:user.role})
  } catch (error) {
    console.log(error);
    
  }
});

router.get("/getuser/:id",FetchUser,async(req,res) =>{
  try {
    const data = await User.findById(req.params.id).select("-password")
  res.json(data);
  } catch (error) {
    console.log(error);
    
  }
})


router.put("/profileupdate/:id",FetchUser,Upload.single("image"),async(req,res)=>{
 try {
   const {firstname,lastname,email} = req.body
  const newuser = {}
  if (firstname) {
    newuser.firstname = firstname
  }
  if (lastname) {
    newuser.lastname = lastname
  }
  if (email) {
    newuser.email = email
  }
  if (req.file) {
    newuser.image = req.file.filename
  }

  let data = await User.findById(req.params.id);
  data = await User.findByIdAndUpdate(req.params.id,{$set:newuser},{new:true});
  console.log(data);
  
  res.json(data);
 
} catch (error) {
  console.log(error);
  
 }
})


router.get("/getalluser",FetchUser,async(req,res)=>{
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
})

router.delete("/deleteuser/:id",FetchUser,async(req,res)=>{
  try {
    let user = await User.findById(req.params.id);
    user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;