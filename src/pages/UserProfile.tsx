import { getUserChannelProfile } from "@/apiServices/userAuth";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AvatarUpload from "@/components/AvatarUpload";
import { Camera } from "lucide-react";
import DashboardPage from "./DashboardPage";

import { useState } from "react";

const UserProfile = () => {
  const { username } = useParams();
  const [showUpload, setshowUpload] = useState(false)
  

  const {
    data: channel,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["channelProfile", username],
    queryFn: () => getUserChannelProfile(username!),
    enabled: !!username,
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div>Error: {(error as any).message}</div>;
  const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1470&auto=format&fit=crop";

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      
      {/* Cover Image */}
      <div className="relative">
        <img
          src={
            channel.coverImage || DEFAULT_COVER
            
          }
          alt="cover"
          className="w-full h-48 md:h-60 object-cover rounded-xl"
          
        />

        {/* Avatar (overlapping) */}
        

<div className="absolute -bottom-14 left-6 group w-28 h-28 md:w-32 md:h-32">
  
  {/* Avatar */}
  <img
    src={channel.avatar}
    alt={channel.username}
    className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
  />

  {/* Hover Overlay */}
  <div
    onClick={() => setshowUpload(true)}
    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
  >
    <Camera className="text-white w-6 h-6" />
  </div>
  
</div>
{showUpload && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <AvatarUpload avatar={channel.avatar}  />
    </div>
  </div>
)}
        
        </div>
      

      {/* Info Section */}
      <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between">
        
        {/* Left Info */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {channel.fullName}
          </h2>
          <p className="text-gray-500">@{channel.username}</p>

          <div className="flex gap-4 mt-2 text-gray-600 text-sm">
            <span>{channel.subscribersCount} subscribers</span>
            <span>{channel.channelsSubscribedToCount} subscribed</span>
          </div>

          <p className="text-gray-500 text-sm mt-1">
            {channel.email}
          </p>
        </div>

        {/* Subscribe Button */}
      
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Placeholder for Videos */}
  

  <DashboardPage/>
    </div>
  );
};

export default UserProfile;