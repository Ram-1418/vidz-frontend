import React, { useEffect,useState } from 'react'
import { getVideoComments } from '@/apiServices/commentService'
import { useParams } from 'react-router-dom'


const Comments = () => {
    const{id:videoId}=useParams();
    const [comments, setcomments] = useState([''])

    useEffect(() => {
        getVideoComments(String(videoId), 2)
            .then((data) => {
                console.log('data', data);
                setcomments(data.comments)
            })
            .catch((error) => {
                console.log('error', error)
            })
    },[])



    return (
        <div>
           
          {comments.map((comment)=><p>{comment.content}</p>
          )}
            
        </div>
    )
}



export default Comments
