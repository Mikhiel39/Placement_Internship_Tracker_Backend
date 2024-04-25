import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) =>{
    try{
        if(!localfilePath){
            return null
        }
        const response=await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto"
        })
        console.log(response.url);
        return response.url;
    } catch (error){
        fs.unlinkSync(localfilePath);
        return null;
    }
}

export {uploadOnCloudinary};