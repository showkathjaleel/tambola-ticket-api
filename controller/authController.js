import User from "../models/User.js";
import createError from "../middlewares/createError.js";
import bcrypt from "bcrypt"
import * as dotenv from 'dotenv'
import jwt  from "jsonwebtoken";
dotenv.config()
console.log(process.env.SECRET_KEY)


function generateAccessToken(userId){
    try{
        return jwt.sign({id:userId},process.env.SECRET_KEY,{
            expiresIn:"1d"
        })
    }catch(err){
     console.log(err)
    }

}

export const userRegister=async (req,res,next)=>{
    const  {username, email, password}=req.body;
    const user=await User.findOne({email:email})
    if(user){
        return next(createError("404","User Already Exist"))
        // return res.status(404).json({error:"User Already Exist""})
    }
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)
    
        const newUser= new User({
            username ,
            email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(200).json({msg:"User created Successfully"})

    }catch(err){
       next(err)
    }  
 }

 export const userLogin= async (req,res,next)=>{
    try{
        const {email, password}= req.body;
        const user=await User.findOne({email:email})
        if(!user){
           // return next(createError("404","User not found") )
            return res.status(404).json({error:"User not found"})
        }
        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return next(createError("401","Incorrect Password"))
        }  
        const accessToken=generateAccessToken(user._id)
        res.status(200).json(accessToken)
    }catch(err){
        next(err)
    }
   
 }