const multer = require("multer");
const path = require("path");
const fs = require("fs");


const image = path.join(__dirname,"../upload")
if (!fs.existsSync(image)) {
    fs.mkdirSync(image,{recursive:true})
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,image)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "_" + path.extname(file.originalname));
    }
})

const Upload = multer({storage:storage});
module.exports = Upload;