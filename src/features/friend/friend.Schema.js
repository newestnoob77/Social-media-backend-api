import mongoose from "mongoose";
const friendsSchema = new mongoose.Schema({
    requester:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    recipient:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    status:{
type:String,
enum:["Pending","Accepted","Rejected"],
default:"pending"
    },
    createdAt:{type:Date,default:Date.now}
});
export const FriendModel= mongoose.model("Friends",friendsSchema)