import mongoose from "mongoose";
import dotenv from 'dotenv';
import { otpModel, otpSchema } from "../features/otp/otp.Schema.js";
dotenv.config()
export const connectUsingMongoose=async()=>{
    try{
await mongoose.connect(process.env.DB_URL);
await createIndex()
console.log("Connected to Mongodb using mongoose")    
}catch(err){
console.log(err)
    }
}
const createIndex=async()=>{
    otpSchema.index({createdAt:1})
}