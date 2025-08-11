import axios from "axios";
import { apiBaseUrl } from "../lib/constsants";
import errorsToRecord from "@hookform/resolvers/io-ts/dist/errorsToRecord.js";


async function getVideoUploadSignature() {
   try {
     const response= await axios.get(`${apiBaseUrl}/videos/signature`,{
        withCredentials:true
     })
      const data=response.data.data;
      return data
   } catch (error) {
    console.log(error)
   }
    
}

async function uploadVideo() {
    try {
        const signature=getVideoUploadSignature();
        if (!signature) {
            throw new Error("Failed to generate signatue")
        }
        
    } catch (error) {
        
    }
    
}

export {getVideoUploadSignature}