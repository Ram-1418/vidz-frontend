import {
  getVideoUploadSignature,
  uploadVideo,
} from "@/apiServices/videoService";
import { useUploder } from "@/hooks/useUploder";
import { useState } from "react";

function isFile(file: unknown): file is File {
  return file instanceof File;
}

const VideoUpload = () => {
  const [videoFile, setvideoFile] = useState<File | null>(null);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { progress, uploader, isUploading } = useUploder();
  const temp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoFile || !title) {
      alert("plz upload the videfile and the title");
    }
    try {
      if (!isFile(videoFile) || !isFile(thumbnail)) {
        return;
      }
      const result = await uploadVideo(
        videoFile,
        description,
        title,
        thumbnail,
      );
      console.log("uploaded", result);
      alert("video upload sucessfuly");
    } catch (error) {
      console.log("error", error);
    } finally {
      // setloader(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();
    if (!videoFile || !title) {
      alert("plz upload the videfile and the title");
    }
    try {
      // setloader(true);
      if (!isFile(videoFile) || !isFile(thumbnail)) {
        return;
      }
      const apiSignature = await getVideoUploadSignature();
      if (!apiSignature) {
        throw new Error("failed to generate apisignature");
      }
      await uploader({ videoFile, config: apiSignature });
    } catch (error) {
      throw Error("failed to upload video");
    }
  };
  return (
    <div className="flex items-center justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-5 bg-white shadow-md rounded-md space-x-4 "
      >
        {progress}
        <div>
          <label className="block font-medium" htmlFor="">
            videofile
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setvideoFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded mt-2"
          />
        </div>
        <div>
          <label className="block font-medium" htmlFor="">
            title
          </label>
          <input
            type="text"
            placeholder="Enter the titke of the Video"
            onChange={(e) => settitle(e.target.value)}
            value={title}
            className="w-full border p-2 rounded mt-2"
          />
        </div>
        <div>
          <label className="block font-medium" htmlFor="">
            description
          </label>
          <input
            type="text"
            placeholder="Enter the descrption if the video"
            onChange={(e) => setdescription(e.target.value)}
            value={description}
            className="w-full border p-2 rounded mt-2"
          />
        </div>
        <div>
          <label className="block font-medium" htmlFor="">
            {" "}
            Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded mt-2"
          />
        </div>
        {isUploading && (
          <div className="flex justify-center py-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <button
          disabled={isUploading}
          className={`w-full text-white py-2 rounded mt-5 ${
            isUploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading ? "Uploading" : "Submit"}
        </button>
        {/* <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-accent mt-5">
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default VideoUpload;
