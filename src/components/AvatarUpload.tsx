import { updateUserAvatar } from "@/apiServices/userAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@/types/user.types";

type Props = {
  user: User;
};

const AvatarUpload = ({ user }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setFile(null);
    },
  });

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    mutation.mutate(formData);
  };

  console.log(user?.avatar);

  return (
    <div className=" p-6 rounded-xl shadow-md flex items-center gap-6">
      
      {/* Avatar Preview */}
     
      <div className="relative">
        
        <img
          src={ user?.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3">
        
        {/* File Input */}
        <label className="cursor-pointer bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm text-white w-fit">
          Choose Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || mutation.isPending}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white text-sm disabled:opacity-50"
        >
          {mutation.isPending ? "Uploading..." : "Upload Avatar"}
        </button>

      </div>
    </div>
  );
};

export default AvatarUpload;