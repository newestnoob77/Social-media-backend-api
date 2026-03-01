import './env.js'
import express from 'express'
import mongoose from 'mongoose'

import { userRouter } from './src/features/user/user.Router.js'
import { connectUsingMongoose } from './src/config/mongooseConfig.js'
import { ApplicationError } from './src/middleware/ApplicationError.js'
import { postRouter } from './src/features/post/post.router.js'
import { commentRouter } from './src/features/post/comments/comment.router.js'
import { likeRouter } from './src/features/post/like/like.router.js'
import { friendsRouter } from './src/features/friend/friend.router.js'
import { otpRouter } from './src/features/otp/otp.router.js'
import swagger from "swagger-ui-express"
import apiDocs from "./swagger.json" with { type: "json" };
const app = express()
app.use(express.json())
app.use("/uploads", express.static("src/uploads"));
app.use("/api/users",userRouter)
app.use("/api/post",postRouter)
app.use("/api/comments",commentRouter)
app.use("/api/likes",likeRouter)
app.use("/api/friends",friendsRouter)
app.use("/api/otp",otpRouter)
app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));
app.use((err,req,res,next)=>{
console.log(err)
if(err instanceof mongoose.Error.ValidationError){
    return res.status(400).send(err.message)
}
if(err instanceof ApplicationError){
    return res.status(err.code).send(err.message)
}
})
app.use((req, res)=>{
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3000/api-docs")
});

app.listen(3000,()=>{
    console.log("Server is listening to 3000")
    connectUsingMongoose()
})