import { useState } from "react";
import { createTweet } from "@/apiServices/tweetService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddTweet = () => {
    const [content, setContent] = useState("");
    const queryClient = useQueryClient();

    const addTweetMutation = useMutation({
        mutationFn: createTweet,
        onSuccess: () => {
            setContent("");
            queryClient.invalidateQueries({ queryKey: ["tweets"] });
        },
    });

    const handlePost = () => {
        if (!content.trim()) return;
        addTweetMutation.mutate(content);
    };





    return (
        <div className="p-4 border rounded-lg mb-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full border p-2 rounded-md"
            />

            <button
                onClick={handlePost}
                disabled={addTweetMutation.isPending}
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            >
                {addTweetMutation.isPending ? "Posting..." : "Post"}
            </button>
        </div>
    );
};

export default AddTweet;