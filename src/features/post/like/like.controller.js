import { ApplicationError } from "../../../middleware/ApplicationError.js"
import LikeRepository from "./like.repository.js"
export default class LikeController{
        constructor(){
         this.likeRepository = new LikeRepository
    }
    async toggleLike(req,res,next){
try{
const {postId}=req.params
const {userId}=req.body
const post =await this.likeRepository.toggleLike(postId,userId);
res.json({message:"like toggled",
    likeCount:post.likes.length,
    likes:post.likes
});
}catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async getLikes(req,res,next){
        try{
const likes= await this.likeRepository.getLikes(req.params.id)
res.json({
    postId:req.params.id,
    likeCount:likes.length,
    likes
})
   
}catch(err){
            console.log(err)
            throw new ApplicationError("Getting likes failed")
        }
    }
}