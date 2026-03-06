import mongoose from 'mongoose';
import { ApplicationError } from '../../../middleware/ApplicationError.js';
import { UserModel } from '../user.Schema.js';
export default class UserAuthRepository{
  
    async signup(user){
const newUser = new UserModel(user)
await newUser.save()
return newUser
}
    
    async login(){
return await UserModel.findOne({email,password})
    }
async findByEmail(email){
return await UserModel.findOne({email})
}
    async logout(user,token){  
user.tokens=user.tokens.filter(t=>t!==token)
return await user.save();
    }
   async logoutFromAll(user){
user.tokens=[]
return await user.save()
    }


}
