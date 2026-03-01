import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        required:true,
        trim:true
    },imageUrl:{
        type:String,
        default:""
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },likes:[{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
    }],
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        text:{type:String,required:true},
        createdAt:{type:Date,default:Date.now},
    }]
},{timestamps:true})
export const PostModel =mongoose.model("Post",postSchema)