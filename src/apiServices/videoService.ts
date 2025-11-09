import axios, { Axios } from "axios";
import { apiBaseUrl } from "../lib/constsants";
import { AwardIcon, Video } from "lucide-react";
import { tr } from "zod/v4/locales";


type SignatueType = {
  apiKey: string;
  cloudName: string;
  signature: string;
  folder: string;
  timestamp: string;
};

async function getVideoUploadSignature() {
  try {
    const response = await axios.get(`${apiBaseUrl}/videos/signature`, {
      withCredentials: true,
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function uploadVideoToCloudinary(
  videoFile: File,
  { apiKey, cloudName, signature, folder, timestamp }: SignatueType
) {
  try {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    if (folder) formData.append("folder", folder);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    const response = await axios.post(cloudinaryUrl, formData, {
      onUploadProgress: (progressEvent) => {
        console.log(Number(progressEvent.progress) * 100);
      },
    });
    return response.data;
  } catch (error) {
    console.log(` error while uploadin on clodniary${error}`);
    return error;
  }
}
async function uploadImageToCloudinary(
  imageFile: File,
  { apiKey, cloudName, signature, folder, timestamp }: SignatueType
) {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    if (folder) formData.append("folder", folder);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await axios.post(cloudinaryUrl, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw error;
  }
}
async function uploadVideo(
  videoFile: File,
  title: string,
  description: string,
  thumbnail: File
) {
  try {
    const signature = await getVideoUploadSignature();
    if (!signature) throw new Error("Failed to generate signature");

    // Upload video
    const uploadedVideo = await uploadVideoToCloudinary(videoFile, signature);

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", uploadedVideo.secure_url);
    // formData.append("publicId", uploadedVideo.public_id);
    formData.append("duration", uploadedVideo.duration);
    formData.append("thumbnail", thumbnail); // If thumbnail is a file, pass the file object

    // Send request with form-data
    const response = await axios.post(`${apiBaseUrl}/videos`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in uploadVideo:", error);
    throw error;
  }
}

async function getAllVideo() {
  try {
    const response = await axios.get(`${apiBaseUrl}/videos`, {
      withCredentials: true,
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching videos:", error);
    throw error;
  }
}
async function deleteVideo(videoId:string) {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/videos/${videoId}`,
      { withCredentials: true } 
    );

    return response.data; 
  } catch (error:string) {
    console.error("Error deleting video:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}
async function togglePublishStatus(videoId:string) {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/videos/${videoId}/toggle-publish`, 
      
      { withCredentials: true } 
    );

    return response.data; // return the backend response
  } catch (error) {
    console.error("Error toggling publish status:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}
async function updateVideo (videoId,videoData) {
  try {
    const formData=new FormData();
    formData.append("title",videoData.title);
    formData.append("description",VideoData.description)



    if (VideoData.thumbnail instanceof File) {
      formData.append("thumbnail",VideoData.thumbnail)
    }
    
    const respone = await axios.patch(
      `${apiBaseUrl}/videos/${videoId}`,
      formData,
      {withCredentials:true}
    )
  } catch (error) {
    console.log('Error updating video', error.respone?.data || error.message)
    throw error.respone?.data || error

    
  }
  
}

async function getCloudinaryApiSignature  () {

  try {
    const respone= await axios.get(
      `${apiBaseUrl}/videos/signature`,
      {withCredentials:true}
    )
    return respone.data
    
  } catch (error) {
    console.log('error', error)

    
  }
  
}

export {
  getVideoUploadSignature,
  uploadVideoToCloudinary,
  uploadVideo,
  getAllVideo,
  uploadImageToCloudinary,
  deleteVideo,
  togglePublishStatus,
  getCloudinaryApiSignature
};

