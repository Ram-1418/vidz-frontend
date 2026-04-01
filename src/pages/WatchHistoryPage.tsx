import { useQuery } from "@tanstack/react-query";
import { getUserWatchHistory } from "@/apiServices/userAuth";
import VideoCard from "@/components/videos/VideoCard";


const WatchHistoryPage = () => {
    const {data,isLoading,error}=useQuery({
        queryKey:["watchHistory"],
        queryFn:getUserWatchHistory,
    })
    if (isLoading) return <p>Loading history...</p>;
  if (error) return <p>Failed to load history</p>;
  console.log('data', data)
  return (
   <div className="  p-3 sm: sm:px-4 md:px-6  md:pt-6 flex justify-center">
      <div className="w-full  ">
        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        gap-x-4 gap-y-6
      "
        >
       {data?.data?.map((video: any) => (
    <VideoCard key={video._id} video={video} />
  ))}
        </div>
      </div>
    </div>
  )
}

export default WatchHistoryPage



