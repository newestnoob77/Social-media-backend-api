import mongoose from 'mongoose';
import { ApplicationError } from '../../../middleware/ApplicationError.js';
import { UserModel } from '../user.Schema.js';
export default class UserAuthRepository{
  
    async signup(user){
try{
const newUser = new UserModel(user)
await newUser.save()
return newUser
}
catch(err){
console.log(err)
if(err instanceof mongoose.Error.ValidationError){
    throw err;
}
else{
    throw new ApplicationError("Something went wrong")
}
}
    }
    async login(){
try{
return await UserModel.findOne({email,password})
}catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
async findByEmail(email){
try{
return await UserModel.findOne({email})
}catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
}
    async logout(user,token){
        try{
user.tokens=user.tokens.filter(t=>t!==token)
return await user.save();
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }
    }
    async logoutFromAll(user){
try{
user.tokens=[]
return await user.save()
}catch(err){
    console.log(err)
    throw new  ApplicationError("Something went wrong")
}
    }

}