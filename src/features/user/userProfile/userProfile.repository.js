import { UserModel } from "../user.Schema.js";
export default class UserProfileRepository{
    async getDetailsById(userId){
     const detail =  await UserModel.findById(userId)
     return detail
    }
    async getAllDetails(){
const details = await UserModel.find()
return details
    }
    async updateDetails(userId,updateData){
        const {password,...safeData}=updateData;
        return await UserModel.findByIdAndUpdate(userId,{$set:safeData},{
            new:true,runValidators:true
        })
    }
    async updateAvatar(userId,avatarPath){
         return await UserModel.findByIdAndUpdate(userId,{$set:{avatar:avatarPath}},{returnDocument:'after'})
    }
}