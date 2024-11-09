import user from "../modules/user.js"
import { Request,Response, NextFunction } from "express-serve-static-core";
import { hash,compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const userSignup = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    //get all users from database.
    try {
        const {name,email,password}= req.body;
        const AlreadyUsedEmail = await user.findOne({email});
        if(AlreadyUsedEmail) return res.status(401).send("An User with this email already exists");
        const hashedPassword= await hash(password,10);
        const User = new user({name,email,password:hashedPassword});
        await User.save();
        res.clearCookie(COOKIE_NAME,{
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path:"/",

        });
        
        const token = createToken(User._id.toString(),User.email,"7d");
        const expires= new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({message: "OK",name:User.name,email:User.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR",cause: error.message});
    }
}

export const userLogin = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    //get all users from database.
    try {
        const {email,password}= req.body;
        const existingUser = await user.findOne({email});
        if(!existingUser){
            return res.status(401).send("User Does not exists");
        }
        const isPasswordCorrect= await compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }
        res.clearCookie(COOKIE_NAME,{
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path:"/",

        });

        const token = createToken(existingUser._id.toString(),existingUser.email,"7d");
        const expires= new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({message: "OK",name:existingUser.name,email:existingUser.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR",cause: error.message});
    }
} 
export const verifyUser = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    //get all users from database.
    try {
        const existingUser = await user.findById(res.locals.jwtData.id);
        if(!existingUser){
            return res.status(401).send("User is not registered for token");
        }
        if(existingUser._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions do not match");
        }
        return res.status(200).json({message: "OK",name:existingUser.name,email:existingUser.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR",cause: error.message});
    }
} 

export const getAllUsers = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    //get all users from database.
    try {
        const users = await user.find();
        return res.status(200).json({message: "OK",users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR",cause: error.message});
    }
}

export const userLogOut = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    //get all users from database.
    try {
        const existingUser = await user.findById(res.locals.jwtData.id);
        if(!existingUser){
            return res.status(401).send("User is not registered for token");
        }
        if(existingUser._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions do not match");
        }
        res.clearCookie(COOKIE_NAME,{
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path:"/",

        });
        return res.status(200).json({message: "OK",name:existingUser.name,email:existingUser.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR",cause: error.message});
    }
}