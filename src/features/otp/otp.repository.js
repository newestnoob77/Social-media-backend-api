import { otpModel } from "./otp.Schema.js"

export default class OtpRepository{
    async createOtp(userId,otp,expiresAt){
        return await otpModel.create({user:userId,otp,expiresAt})
    }
    async verifyOtp(userId,otp){
return await otpModel.findOne({
    user:userId,otp,used:false,expiresAt:{$gt:new Date()}
});
    }
    async markOtpUsed(otpId){
        return await otpModel.findByIdAndUpdate(otpId,{used:true});
    }
}