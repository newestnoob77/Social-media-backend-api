import express from 'express'
import UserAuthController from './userAuthentication/userAuth.controller.js'
import { jwtAuth } from '../../middleware/jwt.middleware.js'
import UserProfileController from './userProfile/userProfile.controller.js'
import { uploadAvatar } from '../../middleware/multer.middleware.js'
export const userRouter = express.Router()
const userControllerAuth= new UserAuthController()
const userControllerProfile = new UserProfileController()


// --------------User authentication routing---------

userRouter.post("/signup",(req,res,next)=>{
userControllerAuth.signUp(req,res,next)
})
userRouter.post("/signin",(req,res,next)=>{
    userControllerAuth
    .login(req,res,next)
})

userRouter.post("/logout",jwtAuth,(req,res,next)=>{
    userControllerAuth
    .logOut(req,res,next)
})
userRouter.post('/logout-all-devices',jwtAuth,(req,res,next)=>{
    userControllerAuth
    .logOutFromAllDevices(req,res,next)
})

// ----------User Profile routing-------------------
userRouter.get("/get-details/:userId",jwtAuth,(req,res,next)=>{
    userControllerProfile.getDetailsById(req,res,next)
})
userRouter.get("/get-all-details",jwtAuth,(req,res,next)=>{
    userControllerProfile.getAllDetails(req,res,next)
})
    userRouter.post("/update-details/:userId",jwtAuth,uploadAvatar.single('avatar'),(req,res,next)=>{
        userControllerProfile.updateDetails(req,res,next)
    })