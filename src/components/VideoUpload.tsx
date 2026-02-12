import {
  getVideoUploadSignature,
  uploadVideo,
} from "@/apiServices/videoService";
import { useUploder } from "@/hooks/useUploder";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  videoFile: FileList;
  title: string;
  description: string;
  thumbnail: FileList;
};

const VideoUpload = () => {
  const navigate = useNavigate();
  const { progress, uploader, isUploading } = useUploder();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const videoFile = data.videoFile[0];
      const thumbnail = data.thumbnail[0];

      if (!videoFile || !thumbnail) {
        alert("Please upload video and thumbnail");
        return;
      }

      const apiSignature = await getVideoUploadSignature();
      if (!apiSignature) {
        throw new Error("Failed to generate API signature");
      }

      const { duration, url } = await uploader({
        videoFile,
        config: apiSignature,
      });

      const result = await uploadVideo({
        description: data.description,
        duration,
        thumbnail,
        title: data.title,
        videoUrl: url,
      });

      console.log("uploadedFile", result);
    } catch (error) {
      console.error("Failed to upload video", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-5 bg-white shadow-md rounded-md space-y-4"
      >
        {progress}

        {/* Video File */}
        <div>
          <label className="block font-medium">Video File</label>
          <input
            type="file"
            accept="video/*"
            {...register("videoFile", { required: "Video is required" })}
            className="w-full border p-2 rounded mt-2"
          />
          {errors.videoFile && (
            <p className="text-red-500 text-sm">{errors.videoFile.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter video title"
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded mt-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            {...register("description")}
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block font-medium">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", {
              required: "Thumbnail is required",
            })}
            className="w-full border p-2 rounded mt-2"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Loader */}
        {isUploading && (
          <div className="flex justify-center py-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <button
          disabled={isUploading}
          className={`w-full text-white py-2 rounded ${
            isUploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
