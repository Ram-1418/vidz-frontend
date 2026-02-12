import { CloudinaryApiSignature } from "@/types/uploader.types";
import axios from "axios";
import { useState } from "react";
type UploaderParams = {
  videoFile: File;
  config: CloudinaryApiSignature;
};

type UploadedFile = {
  url: string;
  duration: number;
};
export const useUploder = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedfile] = useState<UploadedFile | null>(null);
  const [iscomplete, setisComplete] = useState(false);
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
      const { data } = resp;
      const result = {
        duration: data.duration,
        url: data.url,
      };
      setUploadedfile(result);
      setisComplete(true);
      return result;
    } catch (error) {
      throw new Error("faild to upload");
    } finally {
      setUploading(false);
    }
  };
  console.log("uploadedFile", uploadedFile);
  return {
    progress,
    uploader,
    isUploading,
    uploadedFile,
    iscomplete,
  };
};
