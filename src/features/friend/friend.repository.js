import mongoose from "mongoose";
import { FriendModel } from "./friend.Schema.js";

import { ApplicationError } from "../../middleware/ApplicationError.js";
export default class FriendRepository{
    async getFriends(userId){
return await FriendModel.find({
    $or:[
        {requester:userId,status:"accepted"},
        {recipient:userId,status:"accepted"}
    ]
}).populate("requester","name email")
.populate("recipient","username email")
.exec()
    }
    async getPendingRequest(userId){
        return await FriendModel.find({
            recipient:userId,
            status:"pending"
        }).populate("requester","username email").exec()
    }
    async toggleFriendship(userId,friendId){
const exsisting= await FriendModel.find({
    $or:[
        {requester:userId,recipient:friendId},
        {requester:friendId,recipient:userId}
    ]
})
if(exsisting.length > 0){
    await FriendModel.deleteOne({_id:exsisting[0]._id})
    return {action:"removed",friendId}
}else{
    const newFriendship= new FriendModel({requester:userId,recipient:friendId,status:"Pending"})
    await newFriendship.save()
return{action:"requested",friendId}
}
    }
async responseToRequest(userId,friendId,action){
    const friendship= await  FriendModel.findOne({
        requester:friendId,
        recipient:userId,
        status:"pending"
    })
    if(!friendship){
        return null;
    }
    if(action==="accept"){
        friendship.status="Accepted"
        await friendship.save()
        return {action:"accepted",friendId}
    }else if(action==="reject"){
        friendship.status="Rejected"
        await friendship.save()
        return  {action:"rejected",friendId}
    }
    else{
        throw new ApplicationError("Invalid action")
    }
}
}