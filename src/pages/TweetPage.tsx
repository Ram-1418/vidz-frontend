import AddTweet from "@/components/AddTweet";
import TweetItem from "@/components/TweetItem";
import { useQuery } from "@tanstack/react-query";
import { getUserTweet } from "@/apiServices/tweetService";
import { useAuth } from "@/context/AuthContext";

const TweetsPage = () => {
    const { user } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["tweets", user?._id], // 🔥 add this
        queryFn: () => getUserTweet(user!._id),
        enabled: !!user?._id,
    });

    const tweets = data?.data?.tweets || [];

    return (
        <div className="p-4">
            <AddTweet />

            <div className="space-y-3">
                {!user ? (
                    <p>Loading user...</p>
                ) : isLoading ? (
                    <p>Loading tweets...</p>
                ) : tweets.length === 0 ? (
                    <p>No tweets found</p>
                ) : (
                    tweets.map((tweet: any) => (
                        <TweetItem key={tweet._id} tweet={tweet} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TweetsPage;