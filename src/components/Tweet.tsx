import React, { useState } from "react";
import { createTweet, deleteTweet } from "@/apiServices/tweetservice";

interface TweetType {
  _id: string;
  content: string;
  createdAt: string;
}

const Tweet = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const handleCreateTweet = async () => {
    if (!tweet.trim()) {
      alert("Please enter something to tweet!");
      return;
    }

    try {
      const response = await createTweet(tweet);
      console.log("Tweet posted:", response);

      const newTweet = response.data.tweet;
      setTweets((prev) => [newTweet, ...prev]);
      setTweet("");
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  const handleDelete = async (tweetId: string) => {
    try {
      await deleteTweet(tweetId);
      setTweets((prev) => prev.filter((t) => t._id !== tweetId));
      console.log("Tweet deleted:", tweetId);
    } catch (error) {
      console.log("Error deleting tweet:", error);
    }
  };
const getUserTweet=async(userId:string)=>{
  try {
    const data=await getUserTweet(userId)
    console.log('data', data)
  } catch (error) {
    console.log('error', error)
    
  }
}
  return (

    
    <div className="p-4 max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md">
      <input
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        type="text"
        placeholder="What's happening?"
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={handleCreateTweet}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tweet
      </button>

      {tweets.map((item) => (
        <div key={item._id} className="p-3 bg-white rounded shadow-sm mt-2">
          <p className="text-gray-800">{item.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </p>
          <button
            onClick={() => handleDelete(item._id)}
            className="text-red-500 hover:text-red-700 mt-2 text-sm"
          >
            Delete
          </button>

        </div>
        
      ))}
    </div>
  );
};

export default Tweet;
