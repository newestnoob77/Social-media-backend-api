import { ApplicationError } from "../../middleware/ApplicationError.js";
import OtpRepository from "./otp.repository.js";
import { UserModel } from "../user/user.Schema.js";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import  crypto from "crypto"
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",      // explicit host/port helps debugging
  port: 587,
  secure: false,    
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        },
          tls: {
    // ← ignore self-signed / untrusted certificates
    rejectUnauthorized: false
  }
    });
export default class OtpController{
    constructor(){
        this.otpRepository =new OtpRepository()
    }
  
    async sendOtp(req,res,next){
try{
const {email}=req.body
const user = await UserModel.findOne({email:email})
console.log(user)
if(!user)return res.status(404).json({message:"User not found"})
const otp =crypto.randomInt(100000,999999).toString();
const expiresAt = new Date(Date.now()+5*60*1000)
await this.otpRepository.createOtp(user._id,otp,expiresAt);
await transporter.sendMail({
    from:process.env.USER_EMAIL,
    to:email,
    subject:"Your OTP Code",
    text:`Your OTP is ${otp}.It expires in 5 minutes`
},(error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }}
);
return res.status(200).json({message:"OTP sent to email"})
}catch(err){
    console.log(err)
throw new ApplicationError("Something went wrong")
}
    }
async verifyOtp(req,res,next){
  try{
const {userId,otp}=req.body
const record = await this.otpRepository.verifyOtp(userId,otp)
if(!record)return res.status(404).send({message:"Invalid or expired OTP"})
  await this.otpRepository.markOtpUsed(record._id)
res.status(200).json({message:"Otp verified successfully"})
  }
  catch(err){
    console.error(err);
    throw new ApplicationError("Error verifying otp")
  }
}
async resetPassword(req,res,next){
  try{
const{userId,newPassword}=req.body;
const user = await UserModel.findById(userId)
if (!user) return res.status(404).json({ message: 'User not found' });
const hashedPassword = await bcrypt.hash(newPassword,10)
user.password=hashedPassword
await user.save();
res.status(200).json({ message: 'Password reset successful' });
  }
  catch(err){
    console.log(err)
    throw new ApplicationError("Error updating password")
  }
}

}