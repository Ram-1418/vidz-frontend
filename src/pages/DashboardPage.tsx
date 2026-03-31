import { useQuery } from "@tanstack/react-query";
import { getChannelStats, getChannelVideos } from "@/apiServices/dashboardService";

import StatsSection from "@/components/dashboard/StatsSection";
import VideosSection from "@/components/dashboard/VideosSection";



const DashboardPage = () => {


    const {data:stats,isLoading:statsLoading }=useQuery({
        queryKey:["channelStats"],
        queryFn:getChannelStats,
    });
    const{data:videos,isLoading:videosLoading }=useQuery({
        queryKey:["channelVideos"],
        queryFn:()=>getChannelVideos(1,10),
    })
     if (statsLoading || videosLoading) return <div>Loading...</div>;
        
    
  return (
  <div className="p-6 space-y-8">
  <h1 className="text-2xl font-bold">Dashboard</h1>

  <StatsSection stats={stats?.data?.stats} />
  <VideosSection videos={videos?.data?.videos} />
</div>
  )
}

export default DashboardPage