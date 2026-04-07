

const ChannelCard = ({ channel }) => {
    return (
        <div className='flx items-center gap-3 border p-3 rounded-lg'>
            <img
                src={channel.avatar}
                alt={channel.username}
            />
            <div>
                <p className="font-semibold">{channel.fullName}</p>
                <p className="text-sm text-gray-500">@{channel.username}</p>
            </div>
        </div>
    )
}

export default ChannelCard;