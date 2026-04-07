import VideoCard from "../videos/VideoCard";

const VideosSection = ({ videos }: any) => {
  if (!videos?.length) return <p>No videos found</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Videos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {videos.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideosSection