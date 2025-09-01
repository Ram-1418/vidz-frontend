import { uploadVideo } from '@/apiServices/videoService';
import React, { useState } from 'react';

const VideoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video first");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      setLoading(true);
      const response = await uploadVideo(file, title);
      console.log("Uploaded Video Response:", response);
      alert("✅ Video uploaded successfully!");
      setTitle("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed", error);
      alert("❌ Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Upload Video
        </h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* File Input */}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 mb-4 text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
