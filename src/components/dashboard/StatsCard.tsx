const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;