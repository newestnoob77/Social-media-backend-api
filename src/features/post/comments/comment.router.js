import  express from 'express'
import CommentController from './comment.controller.js'
export const commentRouter= express.Router()
const commentController = new CommentController()
commentRouter.get("/:postId",(req,res,next)=>{
    commentController.getComments(req,res,next)
})
commentRouter.post("/:postId",(req,res,next)=>{
    commentController.addComments(req,res,next)
})
commentRouter.put("/:commentId",(req,res,next)=>{
    commentController.updateComments(req,res,next)
})
commentRouter.delete("/:commentId",(req,res,next)=>{
    commentController.deleteComments(req,res,next)
})