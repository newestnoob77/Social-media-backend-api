import UserAuthRepository from "./userAuth.Repostiory.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ApplicationError } from "../../../middleware/ApplicationError.js";
import dotenv from 'dotenv'
dotenv.config()
export default class  UserAuthController{
    constructor(){
this.userRepository= new UserAuthRepository()
    }
    async signUp(req,res,next){
try{
    console.log(req.body)
const {name,email,password}=req.body
// Validate password before hashing
const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
if (!passwordRegex.test(password)) {
    return res.status(400).send("Password should be 8–12 characters long and include at least one special character")
}
const hashedPassword = await bcrypt.hash(password,12);
const user = {name, email, password: hashedPassword}
await this.userRepository.signup(user)
return res.status(201).send(user)
}catch(err){
next(err)
}
    }
    async login(req,res,next){
try{
const {email,password}=req.body
const user = await this.userRepository.findByEmail(email);
if(!user){
    return res.status(400).send("Incorrect Credentials")
}
    const result = await bcrypt.compare(password,user.password)
    if(!result){
        return res.status(400).send("Incorrect credentialsl")
    }
        const token =jwt.sign({
            userID:user._id,
            email:user.email
        },process.env.JWT_SECRET,{expiresIn:'1h'}
    );
    user.tokens.push(token);
    await user.save();
    return res.status(200).json({token})
}catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async logOut(req,res,next){
        try{
await this.userRepository.logout(req.user,req.token)
res.send("Logged out from current device");
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something wrong : logout failed")
        }
    }
    async logOutFromAllDevices(req,res,next){
        try{
await this.userRepository.logoutFromAll(req.user)
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something wrong: Logout from all devices failed")
        }
    }
}