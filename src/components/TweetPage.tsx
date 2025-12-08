import { createTweet } from '@/apiServices/tweetservice'

import React,{useState} from 'react'




const TweetPage = () => {
  const [tweet, settweet] = useState('')



 const habdleCreatetweet=async(content:string)=>{
  try {
   const data= await createTweet(content)
   settweet()
   console.log('data', data)
    
  } catch (error) {
    console.log('error', error)
    
  }
 } 
  return (
    <div>
      <div>
        <input type="text"
        placeholder='Enter a tweet'
         value={tweet}
         onChange={(e)=>settweet(e.target.value)}
        />
        <button
        className='h-5 w-5 p-5 bg-black-300'
        onClick={()=>habdleCreatetweet(tweet)}
        >Comment</button>
      </div>
    </div>
  )
}

export default TweetPage
