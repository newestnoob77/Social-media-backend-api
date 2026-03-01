import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { ApplicationError } from './ApplicationError.js';
const uploadDir=path.resolve('./uploads/');
if(!fs.existsSync(uploadDir)){
    fs.mkkdirSync(uploadDir,{recursive:true})
}


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, uploadDir)
    },  filename: (req, file, cb) => {
    // Replace invalid characters in ISO string
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeName = `${timestamp}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, safeName);
  }
});


export const uploadAvatar=multer({storage:storage})