import { ApplicationError } from "../../../middleware/ApplicationError.js"
import { PostModel } from "../post.schema.js"
export default class LikeRepository{
    async toggleLike(postId,userId){
        const post = await PostModel.findById(postId)
        if(!post) throw new ApplicationError("Post not found",404);
         const alreadyLiked = post.likes.some(like => like.toString() === userId.toString() );
        if(alreadyLiked){
            post.likes=post.likes.filter(like=>like.toString()!==userId.toString());
        }else{
            post.likes.push(userId);
        }
await post.save()
return post
    }
    async getLikes(postId){
       
const post =await PostModel.findById(postId).populate("likes","name email")
     if(!post) throw new ApplicationError("Post not found");
     return post.likes;
    }
   
}