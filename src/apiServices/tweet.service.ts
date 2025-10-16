import { apiBaseUrl } from "@/lib/constsants";
import axios from "axios";
import { data } from "react-router-dom";


export const createTweet = async (content: string) => {
    try {
        const respone = await axios.post(
            `${apiBaseUrl}/tweets/`,
            { content },
            { withCredentials: true }
        );
        return respone.data
    } catch (error: any) {
        console.error("Error creating tweet", error.respone ? data || error)
    }
}

export const deleteTweet = async (tweetId:string) => {
    try {
        const respone = await axios.delete(
            `${apiBaseUrl}/tweets/${tweetId}`,

            { withCredentials: true }
        );
        return respone.data

    } catch (error) {
        console.error("Error during the deleting the tweet", error.respone ? data || error)

    }
}

export const getUserTweet = async (userId:) => {
    try {
        const respone = await axios.get(
            `${apiBaseUrl}/user/${userId}`,
            { withCredentials: true }
        )
        return respone.data

    } catch (error) {
        console.error(
            "error fecting user tweets",
            error.respone?.data || error
        )

    }
}

export const updateTweet = async (tweetId, content) => {
    try {
        const response = await axios.patch(
            `${apiBaseUrl}/${tweetId}`,
            { content },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating the tweet", error.response?.data || error);
        throw error;
    }
};