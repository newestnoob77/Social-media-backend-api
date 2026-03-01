import { ApplicationError } from "../../middleware/ApplicationError.js"
import FriendRepository from "./friend.repository.js"

export default class FriendController{
    constructor(){
        this.friendRepository= new FriendRepository()
    }
    async getFriends(req,res,next){
try{
const {userId}=req.params
const friendships =await this.friendRepository.getFriends(userId)
const friends=friendships.map(friend=>{
    if(friend.requester._id.toString()===userId){
        return friend.recipient;
    }else{
        return friend.requester;
    }
})
return res.status(200).send(friends)
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async getPendingRequest(req,res,next){
        try{
const {userId}=req.body
const pendingRequest = await this.friendRepository.getPendingRequest(userId)
const request=pendingRequest.map(p=>p.requester)
return res.status(200).send(request)
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }
    }
    async toggleFriendship(req,res,next){
        try{
const {friendId}=req.params;
const{userId}=req.body
const result = await this.friendRepository.toggleFriendship(userId,friendId)
if(result.action==="removed"){
    res.status(200).json({message:"Friendship request removed",friendId:result.friendId})
}else{
    res.status(200).json({message:"Friendship request added",friendId:result.friendId})
}
        }
        catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }
    }
    async responseToRequest(req,res,next){
        try{
const{friendId}=req.params

const {userId,action}=req.body
const result = await this.friendRepository.responseToRequest(userId,friendId,action);
if(!result){
    return res.status(404).json({message:"no pendingrequest"})
}        
if(result.action==='accepted'){
    return res.status(200).json({message:"Friend request accepted",friendId:result.friendId})
}else{
return res.status(200).json({message:"Friend request rejected ",friendId:result.friendId})
}
}
        catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }
    }
}