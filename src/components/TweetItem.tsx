import { deleteTweet } from "@/apiServices/tweetService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTweetLike } from "@/apiServices/likeService";
const TweetItem = ({ tweet }: any) => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteTweet,

        onSuccess: () => {
            // 🔥 refresh tweets after delete
            queryClient.invalidateQueries({ queryKey: ["tweets"] });
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate(tweet._id);
    };


    const likeMutation = useMutation({
        mutationFn: toggleTweetLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tweets"] })
        }

    })
    const handleLike = () => {
        likeMutation.mutate(tweet._id)
    }

    return (
        <div className="border p-3 rounded-lg shadow-sm">
            <p>{tweet.content}</p>

            <div className="flex gap-3 mt-2">
                <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="text-red-500 text-sm"
                >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>


                <button
                    onClick={handleLike}
                    className="text-red-600 text-sm"
                >
                    Like
                </button>
            </div>
        </div>
    );
};

export default TweetItem;