import express from 'express'
import FriendController from './friend.controller.js'
export const friendsRouter= express.Router()
const friendController = new FriendController()
friendsRouter.get("/get-friends/:userId",(req,res,next)=>{
friendController.getFriends(req,res,next)
})
friendsRouter.get("/get-pending-requests",(req,res,next)=>{
    friendController.getPendingRequest(req,res,next)
})
friendsRouter.post("/toggle-friendship/:friendId",(req,res,next)=>{
    friendController.toggleFriendship(req,res,next)
})
friendsRouter.post("/response-to-request/:friendId",(req,res,next)=>{
    friendController.responseToRequest(req,res,next)
})