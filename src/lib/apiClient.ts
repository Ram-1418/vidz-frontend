import axios from "axios";
import { apiBaseUrl } from "./constsants";

export const apiClient = axios.create({
    baseURL:apiBaseUrl,
    withCredentials:true
})