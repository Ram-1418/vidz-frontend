import { apiBaseUrl } from "@/lib/constsants";
import axios from "axios";

export const createTweet=async()=>{
    const respone= await axios.post(
        `${apiBaseUrl}/`
    )
}
