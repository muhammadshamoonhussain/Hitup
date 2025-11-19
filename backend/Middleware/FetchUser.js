const jwt = require("jsonwebtoken")
const secret_token = "secret_token"

const FetchUser = async (req,res,next) =>{
    const token = req.header("auth-token")
    if (!token) {
        res.status(400).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,secret_token);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = FetchUser;