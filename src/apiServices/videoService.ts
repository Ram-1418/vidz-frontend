import axios, { Axios,  } from "axios";
import { apiBaseUrl } from "../lib/constsants";


type SignatueType={
  apiKey:string,
  cloudName:string,
  signature:string,
  folder:string,
  timestamp:string,
}


async function getVideoUploadSignature() {
   try {
     const response= await axios.get(`${apiBaseUrl}/videos/signature`,{
        withCredentials:true
     })
      const data=response.data.data;
      return data
   } catch (error) {
    console.log(error)
   }
    
}
async function  uploadVideoToCloudinary(
  videoFile: File,
  {apiKey,cloudName,signature,folder,timestamp}:SignatueType
) {
  try {
    const formData= new FormData();
    formData.append("file",videoFile)
    formData.append("api_key",apiKey)
    formData.append("timestamp",timestamp)
    formData.append("signature",signature);

    if(folder) formData.append("folder",folder)


 const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;


 const response= await axios.post(cloudinaryUrl,formData,{
    onUploadProgress:(progressEvent)=>{
      console.log(Number(progressEvent.progress) * 100)
    }
 })
    return response.data
  } catch (error) {
    console.log(` error while uploadin on clodniary${error}`)
    return error
  }
} 
 async function uploadVideo(videoFile: File, title: string,description:string) {
  try {
    const signature = await getVideoUploadSignature();
    if (!signature) throw new Error("Failed to generate signature");

    // Upload to Cloudinary
    const uploadedVideo = await uploadVideoToCloudinary(videoFile, signature);

    // Save video details in backend
    const response = await axios.post(
      `${apiBaseUrl}/videos`,
      {
        title,
        description, // ✅ send title
        videoUrl: uploadedVideo.secure_url,
        publicId: uploadedVideo.public_id,
        duration: uploadedVideo.duration,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error in uploadVideo:", error);
    throw error;
  }
}


  

export {getVideoUploadSignature,uploadVideoToCloudinary,uploadVideo}