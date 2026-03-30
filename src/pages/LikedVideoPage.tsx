// src/pages/LikedVideosPage.tsx

import { useQuery } from "@tanstack/react-query";
import { getLikedVideos } from "@/apiServices/likeService";
import VideoCard from "@/components/videos/VideoCard";

const LikedVideosPage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["likedVideos"],
        queryFn: () => getLikedVideos(1, 10),
    });
    if (isLoading) return <p>Loading...</p>;
    const videos = data?.data.likedVideos.filter((item) => !!item?.video);

    return (

        <div className="p-4 grid grid-cols-3 gap-4">
            {videos.map((item) => (
                <VideoCard key={item.likeId} video={item.video} />
            ))}
        </div>
    );

};

export default LikedVideosPage;