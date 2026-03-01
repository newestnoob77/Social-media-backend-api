import mongoose from "mongoose";
import { PostModel } from "./post.schema.js";
import { ReturnDocument } from "mongodb";
export default class PostRepository{
    async createPost(postData){
const postDetails = new PostModel(postData)
await postDetails.save()    
return postDetails
}
    async getAllPosts(userId){
return await PostModel.find({author:userId})
    }
    async getPostById(postId){
        return await  PostModel.findById(postId)
    }
    async updatePost(postId,updateData){
return await PostModel.findByIdAndUpdate(postId, {$set: updateData}, {returnDocument: "after"})
    }
    async deletePost(postId){
return await PostModel.findByIdAndDelete(postId)
    }
}