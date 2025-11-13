import { apiBaseUrl } from "@/lib/constsants"
import axios from "axios"


async function toggleSubscription(channelID: string) {
    try {
        const response = await axios.post(
            `${apiBaseUrl}/subscriptions/c/${channelID}`,
            { withCredentials: true }
        )

        const data = response.data
        console.log('data', data)
        return response
    } catch (error) {
        console.error('error', error)

    }

}

async function getSubscribedChannels(subscriberId: string) {
    try {
        const response = await axios.get(
            `${apiBaseUrl}/subscriptions/c/${subscriberId}`,
            { withCredentials: true }
        )
        return response.data.success;

    } catch (error) {
        console.error('error', error)
    }
}

async function getUserChannelSubscribers(channelID: string) {
    try {
        const response = await axios.post(
            `${apiBaseUrl}/subscriptions/c/S{channelID}`,
            { withCredentials: true }

        )
        return response.data

    } catch (error) {
        console.log('error', error)
    }

}

export{
    getUserChannelSubscribers,
    getSubscribedChannels,
    toggleSubscription
}