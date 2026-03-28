import AddTweet from "@/components/AddTweet";
import TweetItem from "@/components/TweetItem";
import { useQuery } from "@tanstack/react-query";
import { getUserTweet } from "@/apiServices/tweetService";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const TweetsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("published");

    const { data, isLoading } = useQuery({
        queryKey: ["tweets", user?._id],
        queryFn: () => getUserTweet(user!._id),
        enabled: !!user?._id,
    });

    const tweets = data?.data?.tweets || [];

    return (
        <div className="flex justify-center px-4 md:px-6">
            <div className="w-full max-w-[900px]">

                {/* Add Post Box */}
                <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4 mb-6 shadow-sm">
                    <AddTweet />
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b mb-4 text-sm font-medium">
                    {["published", "scheduled", "archived"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 capitalize transition ${activeTab === tab
                                    ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                                    : "text-gray-500 hover:text-black dark:hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {!user ? (
                        <p className="text-gray-500">Loading user...</p>
                    ) : isLoading ? (
                        <p className="text-gray-500">Loading posts...</p>
                    ) : tweets.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            No posts yet
                        </div>
                    ) : (
                        tweets.map((tweet: any) => (
                            <div
                                key={tweet._id}
                                className="bg-white dark:bg-zinc-900 border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                            >
                                <TweetItem tweet={tweet} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TweetsPage;