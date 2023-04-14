import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async(req,res,next)=>{
    
    const token = req.body.token || req.body.token || res.headers['x-access-token'];

    if(!token){
        return res.status(403).send("A token is required for authentication");
    }

    try{
        const decoded =  jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
    }catch(err){
        return res.status(401).send("Invalid Token");
    }
    return next();
}

export default verifyToken;