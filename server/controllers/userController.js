import { generateToken } from "../lib/utils.js";
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

//sign up new usr
export const signup = async (req,res)=>{
    const {fullName,email,password,bio, profilePic} = req.body;
    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success:false,message:"missing details"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success:false,message:"Accnt alrdy exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        let profilePicUrl = "";
        if(profilePic){
             const upload = await cloudinary.uploader.upload(profilePic);
             profilePicUrl = upload.secure_url;
        }

        const newUser = await User.create({fullName,email,password:hashedPassword,bio, profilePic: profilePicUrl});

        const token = generateToken(newUser._id);
        res.json({success:true,message:"Accnt created",userData:newUser,token})
    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error.message)
    }
}

//controller to login usr
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id);
        res.json({ success: true, message: "Login successful",userData, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error.message);
    }
}

//controller to check if user is authenticated
export const checkAuth = (req,res) => {
    res.json({success:true,message:"User authenticated",user:req.user})
}

//controller to update user profile detls
export const updateProfile = async (req,res) => {
    try{
        const { profilePic , bio , fullName } = req.body;

        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName, profilePic: upload.secure_url },
                { new: true }
            );
        }
        res.json({ success: true, message: "Profile updated", user: updatedUser });
    }catch(error){
        res.json({ success: false, message: error.message });
        console.log(error.message);
    }
}   