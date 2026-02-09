import { CloudinaryApiSignature } from "@/types/uploader.types";
import axios from "axios";
import { useState } from "react";
type UploaderParams = {
  videoFile: File;
  config: CloudinaryApiSignature;
};
export const useUploder = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);

  const uploader = async ({ videoFile, config }: UploaderParams) => {
    try {
      setUploading(true);
      const { apiKey, cloudName, signature, timestamp, folder } = config;
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      if (folder) {
        formData.append("folder", folder);
      }
      const resp = await axios.post(cloudinaryUrl, formData, {
        onUploadProgress: (progressEvent) => {
          setProgress(Number(progressEvent.progress) * 100);
          console.log("from hook", Number(progressEvent.progress) * 100);
        },
      });
      console.log("resp", resp);
    } catch (error) {
      throw new Error("faild to upload");
    } finally {
      setUploading(false);
    }
  };

  return {
    progress,
    uploader,
    isUploading,
  };
};
