import { getUserChannelProfile } from '@/apiServices/userAuth';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom'

const ChannelPage = () => {
    const {username} =useParams<{username:string}>;

    const {data}=useQuery({
        queryKey:["channel",username],
        queryFn:()=>getUserChannelProfile(username!),
    })
    const channel=data?.data;

    if(!channel)return <p>Loading...</p>
  return (
    <div>

    </div>
  )
}

export default ChannelPage