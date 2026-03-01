 import mongoose from 'mongoose';
 export const otpSchema = new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
otp:{type:String,required:true},
expiresAt:{type:Date,required:true},
used:{type:Boolean,default:false}
 });
 export const otpModel = mongoose.model("Otp",otpSchema)