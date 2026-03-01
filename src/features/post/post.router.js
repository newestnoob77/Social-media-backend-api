import express from 'express';
import PostController from './post.controller.js';
const postController = new PostController();
export const postRouter = express.Router()
postRouter.post("/",(req,res,next)=>{
    postController.createPost(req,res,next)
})
postRouter.get("/",(req,res,next)=>{
    postController.getAllPost(req,res,next)
})
postRouter.get("/:postId",(req,res,next)=>{
    postController.getPostById(req,res,next)
})
postRouter.put("/:postId",(req,res,next)=>{
postController.updatePost(req,res,next)
})
postRouter.delete("/:postId",(req,res,next)=>{
    postController.deletePost(req,res,next)
})