import User from "../models/User.js";
import jwt from "jsonwebtoken";


//midlwr to prtct routes
export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user)
            return res.json({success:false,message:"Not found user "})

        req.user = user;
        next();

    }catch(error){
        return res.json({success:false,message:error.message})
        console.log(error.message)
    }
}  

