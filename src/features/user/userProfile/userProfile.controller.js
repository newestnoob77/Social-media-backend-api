import { ApplicationError } from "../../../middleware/ApplicationError.js"
import UserProfileRepository from "./userProfile.repository.js"

export default class UserProfileController{
    constructor(){
this.userProfileRepository = new UserProfileRepository
    }
    async getDetailById(req,res,next){
try{
const detail = await this.userProfileRepository.getDetailsById(req.params.userId);
if(!detail){
    res.status(404).send("User is not found")
    
}
const {password,...safeDetail}=detail.toObject();
    res.status(200).json(safeDetail)
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async getAllDetails(req,res,next){
try{
const details = await this.userProfileRepository.getAllDetails()

if(!details || details.length===0){
    res.status(404).send("Details not found")
}
const safeDetails =details.map(detail=>{
    const {password,...safe}=detail.toObject()
    return safe
})
res.status(200).json(safeDetails)
}catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async updateDetails(req,res,next){
        try{
const userId =req.params.userId
if(req.file){
    const updatedUser=await this.userProfileRepository.updateAvatar(userId,req.file.path)
return res.status(200).json({message:"Avatar updated successfully",data:updatedUser})
}
const updateData=req.body;
if(updateData.password){
    throw new ApplicationError("Password updates are not allowed")
}
const updatedUser =await this.userProfileRepository.updateDetails(userId,updateData);
if(!updatedUser){
    throw new ApplicationError("User not found")
}
res.status(200).json({
    message:"User details updated successfully",
    data:updateData
});
        }
        catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }
    }
}