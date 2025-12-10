import React, { useEffect, useState } from "react";
import { getChannelStats } from "@/apiServices/DashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function getChannale() {
      try {
        const res = await getChannelStats();
        console.log("data", res);

        setStats(res.data.stats);
      } catch (error) {
        console.log("error", error);
      }
    }
    getChannale();
  }, []);

  return (
    <div className="flex justify-center mt-6">
      {stats && (
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 border">
          <h2 className=" text-xl font-bold text-center mt-4">Channel State</h2>

          <div className="flex justify-center">
            <img
              src={stats.avatar}
              className="w-24 h-24 rounded-full object-cover border  shadow-sm"
              alt="avatar"
            />
          </div>

          <div className=" mt-4 space-y-2 text-gray-700">
            <p>
              <strong>Username:</strong> {stats.username}
            </p>
            <p>
              <strong>Email:</strong> {stats.email}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="font-semibold">
                <strong>Total Subscribers:</strong> {stats.totalSubscribers}
              </p>
              <p
              className="text-sm text-gray-600"
              >
                <strong>Total Videos:</strong> {stats.totalVideos}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p
              className="font-semibold"
              >
                <strong>Total Views:</strong> {stats.totalViews}
              </p>
              <p
              className="text-sm text-gray-600"
              >
                <strong>Total Likes:</strong> {stats.totalVideoLikes}
              </p>
            </div>
            <div
            className="bg-gray-100 p-3 rounded-lg text-center"
            >
              <p
              className="text-sm "
              >
                <strong>Subscribed Channels:</strong>{" "}
                {stats.totalChannelsSubscribedTo}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
