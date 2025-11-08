import { apiBaseUrl } from "@/lib/constsants";
import axios from "axios";
import { data } from "react-router-dom";


export const createTweet = async (content: string) => {
    try {
        const response = await axios.post(
            `${apiBaseUrl}/tweets/`,
            { content },
            { withCredentials: true }
        );
        return response.data
    } catch (error: any) {
        console.error("Error creating tweet", error.respone ? data || error)
    }
}

export const deleteTweet = async (tweetId: string) => {
    try {
        const response = await axios.delete(
            `${apiBaseUrl}/tweets/${tweetId}`,

            { withCredentials: true }
        );
        return {
            success: true,
            data: response.data,
            message: "Tweet deleted successfully",
        }

    } catch (error: any) {
        console.error("Error during the deleting the tweet", error.response ? data || error)


        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Something went wrong while deleting the tweet",
        }
    }
}

export const getUserTweet = async (userId: string) => {
    try {
        const response = await axios.get(
            `${apiBaseUrl}/tweets/user/${userId}`,

            { withCredentials: true }
        )
        return {

            success: true,
            data: response.data,
            message: "Tweet deleted successfully",

        }

    } catch (error: any) {
        console.error(
            "error fecting user tweets",
            error.respone?.data || error
        )

        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Something went wrong while fetching user tweets"
        }

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