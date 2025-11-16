import React, { useState } from "react";
import { createTweet, deleteTweet } from "@/apiServices/tweetservice";
import { toggleTweetLike } from "../apiServices/likeService";

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
      <div className="mt-6 space-y-5">
        {tweets.map((item) => (
          <div key={item._id} className="flex gap-3">
            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            <div className="flex-1">
              {/* NAME + TIME */}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">User</span>
                <span className="text-gray-500 text-xs">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* CONTENT */}
              <p className="text-sm mt-1 text-gray-800">{item.content}</p>

              {/* ACTION BAR */}
              <div className="flex items-center gap-5 mt-2 text-gray-600 text-sm">
                <button
                  onClick={() => handleLike(item._id)}
                  className="flex items-center gap-1 hover:text-black"
                >
                  👍 <span className="text-xs">{item.likes || 0}</span>
                </button>

                <button className="hover:text-black">👎</button>

                <button className="hover:text-black">Reply</button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700 text-xs ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tweet;
