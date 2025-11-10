import { apiBaseUrl } from "@/lib/constsants";
import axios from "axios";
;


export const createTweet = async (content: string) => {
    try {
        const response = await axios.post(
            `${apiBaseUrl}/tweets/`,
            { content },
            { withCredentials: true }
        );
        return response.data
    } catch (error: any) {
        console.error("Error creating tweet")
    }
}

export const deleteTweet = async (tweetId: string) => {
    try {
        const response = await axios.delete(
            `${apiBaseUrl}/tweets/${tweetId}`,

            { withCredentials: true }
        );


    } catch (error: any) {
        console.error("Error during the deleting the tweet")



    }
}

export const getUserTweet = async (userId: string) => {
    try {
        const response = await axios.get(
            `${apiBaseUrl}/tweets/user/${userId}`,

            { withCredentials: true }
        )
        return response.data

    } catch (error: any) {
        console.error(
            "error fecting user tweets",
            error.respone?.data || error
        )



    }
}

export const updateTweet = async (tweetId: string, content: string) => {
    try {
        const response = await axios.patch(
            `${apiBaseUrl}/tweets/${tweetId}`,
            { content },
            { withCredentials: true }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error updating the tweet", error.response?.data || error);
        throw error;
    }
};