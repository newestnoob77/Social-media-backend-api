import express from 'express';
import LikeController from './like.controller.js';
export const likeRouter =express()
const likeController=new LikeController()
likeRouter.get("/:id",(req,res,next)=>{
likeController.getLikes(req,res,next)
})
likeRouter.post("/toggle/:postId",(req,res,next)=>{
    likeController.toggleLike(req,res,next)
})