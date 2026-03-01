import { ApplicationError } from "../../../middleware/ApplicationError.js";
import { PostModel } from "../post.schema.js";
import CommentRepository from "./comment.repository.js";

export default class CommentController{
    constructor(){
        this.commentRepository= new CommentRepository
    }
    async getComments(req,res,next){
try{
const {postId}=req.params
const comments = await this.commentRepository.getComments(postId)
if(comments){
    return res.status(200).send(comments)
}
else{
    return res.status(400).send("Post not found")
}
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }


    async addComments(req,res,next){
try{
const {postId}=req.params;
const {commentData}=req.body
console.log(commentData)
const post = await PostModel.findById(postId);
if(post){
    const newComment = await this.commentRepository.addComments(postId,commentData)
    return res.status(200).send(newComment)
}
else{
    return res.status(400).send("Post not found")
}
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async deleteComments(req,res,next){
try{
const {commentId}=req.params
const {postId}=req.body
const deletePost=await this.commentRepository.deleteComments(postId,commentId)
if(deletePost){
return res.status(200).send(`Comment deleted Successfully`)
}else{
    return res.status(400).send("Comment not found")
}
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async updateComments(req,res,next){
try{
const {commentId}=req.params;
const {postId,updateData}=req.body;
console.log(updateData)
const updatedComment=await this.commentRepository.updateComments(postId,commentId,updateData)
if(updatedComment){
    return res.status(200).send({message:"Comment updated successfully",data:updatedComment})
}else{
    return res.status(400).send("Comment not found")
}
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
}