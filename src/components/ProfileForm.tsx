import { useState } from "react";
import { updateAccountDetails } from "@/apiServices/userAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user.types";

type Props = {
  user: User;
};
const ProfileForm = ({ user }: Props) => {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAccountDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }); // ✅ fixed key
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ fullName, email });
  };

  return (
    <div className="bg-[#111827] p-6 rounded-xl shadow-lg border border-gray-800">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-white mb-4">
        Profile Information
      </h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="text-sm text-gray-400">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mt-1 p-2.5 rounded-md bg-[#1f2937] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="text-sm text-gray-400">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2.5 rounded-md bg-[#1f2937] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={mutation.isPending}
        className="w-full bg-purple-600 hover:bg-purple-700 transition px-4 py-2.5 rounded-md text-white font-medium disabled:opacity-50"
      >
        {mutation.isPending ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default ProfileForm;