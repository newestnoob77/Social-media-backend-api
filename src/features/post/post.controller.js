import { ApplicationError } from "../../middleware/ApplicationError.js";
import PostRepository from "./post.repository.js";

export default class PostController{
    constructor(){
this.postRepository= new PostRepository
    }
    async createPost(req,res,next){
try{
const {caption,imageUrl,author}=req.body
const postData = {caption,imageUrl,author}
const newPost =await this.postRepository.createPost(postData)
return res.status(201).send(newPost)
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async getAllPost(req,res,next){
        try{
            const {userId}=req.query
const getAllPost = await this.postRepository.getAllPosts(userId)
return res.status(200).send(getAllPost)
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }

    }
    async getPostById(req,res,next){
        try{
const {postId}=req.params
const getPostById= await this .postRepository.getPostById(postId)
return res.status(200).send(getPostById)
}
        catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }
    }
    async updatePost(req,res,next){
try{
const {postId}=req.params;
const updateData=req.body;
const updatedData = await this.postRepository.updatePost(postId,updateData)
return res.status(200).send({message:"updated Successfuly"},updatedData)
}catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async deletePost(req,res,next){
try{
const {postId}=req.params
if(postId){
    await this.postRepository.deletePost(postId)
    return res.status(200).send(`Successfuly deleted post : ${postId}`)
}else{
    return res.status(400).send(`Post with id :${postId} not found`)
}
}
catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
}