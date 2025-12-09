import axios from "axios";
import { apiBaseUrl } from "./constsants";

export const axiosInstance = axios.create({
    baseURL:apiBaseUrl,
    withCredentials:true
})