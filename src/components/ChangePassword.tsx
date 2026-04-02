import { useState } from "react";
import { changePassword } from "@/apiServices/userAuth";
import { useMutation } from "@tanstack/react-query";

const ChangePassword = () => {
  const [currentPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");

  const mutation = useMutation({
    mutationFn: changePassword,
  });
    console.log({ currentPassword, newPassword });

  return (
    <div className="bg-[#111827] p-6 rounded-xl shadow-lg border border-gray-800 max-w-md">
  
  {/* Title */}
  <h2 className="text-lg font-semibold text-white mb-4">
    Change Password
  </h2>

  {/* Old Password */}
  <div className="mb-4">
    <label className="text-sm text-gray-400">Old Password</label>
    <input
      type="password"
      placeholder="Enter currrent password"
      onChange={(e) => setOld(e.target.value)}
      className="w-full mt-1 p-2.5 rounded-md bg-[#1f2937] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  {/* New Password */}
  <div className="mb-5">
    <label className="text-sm text-gray-400">New Password</label>
    <input
      type="password"
      placeholder="Enter new password"
      onChange={(e) => setNew(e.target.value)}
      className="w-full mt-1 p-2.5 rounded-md bg-[#1f2937] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  {/* Button */}

   
  <button
    onClick={() => mutation.mutate({ currentPassword, newPassword })}
    disabled={mutation.isPending}
    className="w-full bg-purple-600 hover:bg-purple-700 transition px-4 py-2.5 rounded-md text-white font-medium disabled:opacity-50"
  >
    {mutation.isPending ? "Updating..." : "Change Password"}
  </button>

</div>
  );
};
export default ChangePassword