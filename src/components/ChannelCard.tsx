const ChannelCard = ({ channel }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow-sm hover:shadow-md transition rounded-xl border cursor-pointer">
      
      {/* Avatar */}
      <img
        src={channel.avatar}
        alt={channel.username}
        className="w-14 h-14 rounded-full object-cover border"
      />

      {/* Info */}
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-gray-800">
          {channel.fullName}
        </p>
        <p className="text-sm text-gray-500">
          @{channel.username}
        </p>
      </div>

    </div>
  );
};

export default ChannelCard;