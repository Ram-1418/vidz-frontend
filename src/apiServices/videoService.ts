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
 async function uploadVideo(videoFile: File, title: string,description:string, thumbnail:File) {
  try {
    const signature = await getVideoUploadSignature();
    if (!signature) throw new Error("Failed to generate signature");

    // Upload to Cloudinary
    const uploadedVideo = await uploadVideoToCloudinary(videoFile, signature);

    // Save video details in backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", uploadedVideo.secure_url);
    formData.append("duration", uploadedVideo.duration.toString());
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const response = await axios.post(
      `${apiBaseUrl}/videos`,
      formData,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error in uploadVideo:", error);
    throw error;
  }
}

async function getAllVideo() {
  try {
    const response = await axios.get(`${apiBaseUrl}/videos`, {
      withCredentials: true
    });
    console.log('response.data', response.data)
    return response.data;  
  } catch (error) {
    console.log("Error fetching videos:", error);
    throw error;
  }
}

  

export {getVideoUploadSignature,uploadVideoToCloudinary,uploadVideo,getAllVideo}