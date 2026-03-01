import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../features/user/user.Schema.js'
dotenv.config()
export const jwtAuth=async (req,res,next)=>{
    const token=req.headers['authorization']
    console.log(token)
    if(!token){
        return res.status(401).send("Unauthorized")
    }
    try{
const payload = jwt.verify(token,process.env.JWT_SECRET)
const user = await UserModel.findOne({_id:payload.userID,tokens:token})
if(!user){
    return res.status(401).send("unauthorized");
}
req.user=user;
req.token=token;
next()
    }
    catch(err){
        console.log(err)
        return res.status(401).send("Unauthorized")
    }
}