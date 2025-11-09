

import { apiBaseUrl } from "@/lib/constsants";
import axios from "axios";


 async function createPlaylist (playlistData)  {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/playlists`,
      playlistData,
      {
        
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating playlist:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

async function deletePlaylist (playlistId){
    try {
        const respone= await axios.delete(
            `${apiBaseUrl}/playlists/${playlistId}`
            {withCredentials:true}
        )
        return respone.data
    } catch (error) {
           console.error("Error deleting playlist:", error.response?.data || error.message);
    throw error.response?.data || error;
    }
}

async function getPlaylistById (playlistId) {
    try {
        const respone =await axios.get(
            `${apiBaseUrl}/playlists/${playlistId}`,
            {withCredentials:true}
        )
        return respone.data
        
    } catch (error) {
        console.error("Error fetching playlist:", error.response?.data || error.message);
    throw error.response?.data || error;
    }
}
async function updatePlaylist (playlistId, playlistData) {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/playlists/${playlistId}`,
      playlistData,
      {
      
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating playlist:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
async function removeVideoFromPlaylist (playlistId, videoId)  {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/playlists/${playlistId}/remove/${videoId}`,
      
    
     {   withCredentials: true},
     return response.data;
      )}
    

    
  } catch (error) {
    console.error("Error removing video from playlist:", error.response?.data || error.message);
    throw error.response?.data || error;
  }

 async function addVideoToPlaylist (playlistId, videoId)  {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/playlists/${playlistId}/add/${videoId}`,
      
      {
      
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding video to playlist:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
 async function getUserPlaylists(userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/playlists/user/${userId}`, 
     
    {  withCredentials: true},

    return response.data
    );

   
  } catch (error) {
    console.error("Error fetching user playlists:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
async function addVideoToPlaylist(playlistId, videoId)  {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/playlists/${playlistId}/add/${videoId}`,
      
       { withCredentials: true},
           return response.data;
      )}


  catch (error) {
    console.error("Error adding video to playlist:", error.response?.data || error.message);
    throw error.response?.data || error;
  }


exports{
getPlaylistById,
deletePlaylist
removeVideoFromPlaylist,
addVideoToPlaylist,
getUserPlaylists,
addVideoToPlaylist
}