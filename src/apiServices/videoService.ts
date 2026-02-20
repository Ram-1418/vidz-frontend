import { apiClient } from "@/lib/apiClient";
import { CloudinaryApiSignature } from "@/types/uploader.types";
import { VideoUploadParams } from "@/types/video.types";

async function getVideoUploadSignature(): Promise<
  CloudinaryApiSignature | undefined
> {
  try {
    const response = await apiClient.get(`/videos/signature`, {});
    const data = response.data.data as CloudinaryApiSignature;
    return data;
  } catch (error) {
    throw new Error(" Errpr geenerting cloundinary");
  }
}
async function uploadVideoToCloudinary(
  videoFile: File,
  { apiKey, cloudName, signature, folder, timestamp }: CloudinaryApiSignature,
) {
  try {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    if (folder) formData.append("folder", folder);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    const response = await apiClient.post(cloudinaryUrl, formData, {
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
  { apiKey, cloudName, signature, folder, timestamp }: CloudinaryApiSignature,
) {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    if (folder) formData.append("folder", folder);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await apiClient.post(cloudinaryUrl, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw error;
  }
}

async function uploadVideo({
  videoUrl,
  title,
  description,
  thumbnail,
  duration,
}: VideoUploadParams) {
  try {
    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoUrl", videoUrl);
    // formData.append("publicId", uploadedVideo.public_id);
    formData.append("duration", duration.toString());
    formData.append("thumbnail", thumbnail); // If thumbnail is a file, pass the file object

    // Send request with form-data
    const response = await apiClient.post("/videos/publish/direct", formData);

    return response.data;
  } catch (error) {
    console.error("Error in uploadVideo:", error);
    throw error;
  }
}

async function getAllVideo() {
  try {
    const response = await apiClient.get("/videos?limit=100");
    console.log("response.data", response.data);
    return response.data.data.docs;
  } catch (error) {
    console.log("Error fetching videos:", error);
    throw error;
  }
}
async function deleteVideo(videoId: string) {
  try {
    const response = await apiClient.delete(`/videos/${videoId}`);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting video:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
}
async function togglePublishStatus(videoId: string) {
  try {
    const response = await apiClient.patch(`/videos/${videoId}/toggle-publish`);

    return response.data; // return the backend response
  } catch (error: any) {
    console.error(
      "Error toggling publish status:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
}
async function updateVideo(videoId: string, videoData: any) {
  try {
    const formData = new FormData();
    formData.append("title", videoData.title);
    formData.append("description", videoData.description);

    if (videoData.thumbnail instanceof File) {
      formData.append("thumbnail", videoData.thumbnail);
    }

    const respone = await apiClient.patch(`/videos/${videoId}`, formData);

    return respone.data;
  } catch (error: any) {
    console.log("Error updating video", error.respone?.data || error.message);
    throw error.respone?.data || error;
  }
}

async function getCloudinaryApiSignature() {
  try {
    const respone = await apiClient.get(`/videos/signature`, {});
    return respone.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getVideoById(videoId: string) {
  try {
    const response = await apiClient.get(`/videos/${videoId}`);
    console.log("response", response);
    return response.data.data?.[0];
  } catch (error) {
    console.log("error", error);
    throw error;
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
  getCloudinaryApiSignature,
  updateVideo,
  getVideoById,
};
