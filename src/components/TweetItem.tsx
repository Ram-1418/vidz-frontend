import { deleteTweet } from "@/apiServices/tweetService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toggleTweetLike } from "@/apiServices/likeService";

const TweetItem = ({ tweet }: any) => {
    const queryClient = useQueryClient();

    const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

    // 🔥 DELETE TWEET
    const deleteMutation = useMutation({
        mutationFn: deleteTweet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tweets"] });
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate(tweet._id);
    };

    // ❤️ LIKE / UNLIKE TWEET
    const likeMutation = useMutation({
        mutationFn: toggleTweetLike,
        onSuccess: (res) => {
            if (res?.success) {
                const { tweetId, isLiked } = res.data;

                setLikedMap((prev) => ({
                    ...prev,
                    [tweetId]: isLiked,
                }));
            }

            // 🔄 refresh tweets
            queryClient.invalidateQueries({ queryKey: ["tweets"] });
        },
    });

    const handleLike = () => {
        likeMutation.mutate(tweet._id);
    };

    return (
        <div className="border p-3 rounded-lg shadow-sm">
            <p>{tweet.content}</p>

            <div className="flex gap-3 mt-2">
                {/* DELETE BUTTON */}
                <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="text-red-500 text-sm"
                >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>

                {/* LIKE BUTTON */}
                <button
                    onClick={handleLike}
                    disabled={likeMutation.isPending}
                    className="text-red-600 text-sm"
                >
                    {likedMap[tweet._id] ? "Unlike" : "Like"}
                </button>
            </div>
        </div>
    );
};

export default TweetItem;