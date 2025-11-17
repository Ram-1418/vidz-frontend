import React, { useState } from "react";
import { createTweet, deleteTweet } from "@/apiServices/tweetservice";
import { toggleTweetLike } from "../apiServices/likeService";
import Tweetlist from "./Tweetlist";

interface TweetType {
  _id: string;
  content: string;
  createdAt: string;
  likes?: number;
}

const Tweet = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const handleCreateTweet = async () => {
    if (!tweet.trim()) return alert("Please enter something to tweet!");

    try {
      const response = await createTweet(tweet);
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
    } catch (error) {
      console.log("Error deleting tweet:", error);
    }
  };

  const handleLike = async (tweetId: string) => {
    try {
      await toggleTweetLike(tweetId);
      setTweets((prev) =>
        prev.map((t) =>
          t._id === tweetId ? { ...t, likes: (t.likes || 0) + 1 } : t
        )
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-5">
      {/* COMMENT INPUT (YOUTUBE STYLE) */}
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>

        <div className="flex-1">
          <input
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="w-full border-b border-gray-400 focus:border-black outline-none pb-1 text-sm"
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setTweet("")}
              className="px-4 py-1 text-sm rounded-full hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTweet}
              className={`px-4 py-1 text-sm rounded-full text-white bg-blue-600 hover:bg-blue-700 ${
                !tweet.trim() && "opacity-50 pointer-events-none"
              }`}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* COMMENTS LIST */}
   

    </div>
  );
};

export default Tweet;
