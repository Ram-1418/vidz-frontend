import StatsCard from "./StatsCard";

const StatsSection = ({ stats }: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatsCard title="Videos" value={stats.totalVideos} />
      <StatsCard title="Subscribers" value={stats.totalSubscribers} />
      <StatsCard title="Views" value={stats.totalViews} />
      <StatsCard title="Likes" value={stats.totalVideoLikes} />
    </div>
  );
};

export default StatsSection;