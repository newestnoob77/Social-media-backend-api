import { PostModel } from "../post.schema.js";
export default class CommentRepository{
     async getComments(postId){
return await PostModel.findById(postId).select("comments")
    }
    async addComments(postId,commentData){
return await PostModel.findByIdAndUpdate(postId,{$push:{comments:commentData}},{returnDocument:"after"})
    }
    async deleteComments(postId,commentId){
return await PostModel.findByIdAndUpdate(postId,{$pull:{comments:{_id:commentId}}},{returnDocument:"after"})
    }
    async updateComments(postId,commentId,updateData){
        return await PostModel.findOneAndUpdate({_id:postId,"comments._id":commentId},{$set:{"comments.$.text":updateData.text}},{returnDocument:"after"})
    }
}