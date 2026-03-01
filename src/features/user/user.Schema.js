import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
  name: {type:String,required:true},
  email: {
    type: String,
    required: true,
   unique:true,
    match: [/.+\@.+\..+/, "Please enter a valid email"]
  },
  password: {type: String,required: true},
  gender:{type:String,enum:['male','female','others'],},
  avatar:{type:String,default:""},
  tokens:{type:[String],default:[]}
},{timestamps:true});

export const UserModel = mongoose.model("User", userAuthSchema);
