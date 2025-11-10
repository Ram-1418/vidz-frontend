

import { apiBaseUrl } from "@/lib/constsants";
import axios from "axios";
import handleError from "@/lib/hadleError";

async function createPlaylist(playlistData) {
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
      const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};

async function deletePlaylist(playlistId) {
  try {
    const respone = await axios.delete(
      `${apiBaseUrl}/playlists/${playlistId}`
            { withCredentials: true }
    )
    return respone.data
  } catch (error) {
   const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}

async function getPlaylistById(playlistId:string) {
  try {
    const respone = await axios.get(
      `${apiBaseUrl}/playlists/${playlistId}`,
      { withCredentials: true }
    )
    return respone.data

  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}
async function updatePlaylist(playlistId:string, playlistData:string) {
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
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};
async function removeVideoFromPlaylist(playlistId, videoId) {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/playlists/${playlistId}/remove/${videoId}`,


      { withCredentials: true },
     return response.data;
      )
  
    

    
  }catch (error) {
  const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
}
}

async function addVideoToPlaylist(playlistId:string, videoId:string) {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/playlists/${playlistId}/add/${videoId}`,

      {

        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};
async function getUserPlaylists(userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/playlists/user/${userId}`,

      { withCredentials: true },

    return response.data
    );


  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
};
async function addVideoToPlaylist(playlistId:string, videoId:string) {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/playlists/${playlistId}/add/${videoId}`,

      { withCredentials: true },
           return response.data;
      
  )}


  catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}


exports{
    getPlaylistById,
      deletePlaylist,
      removeVideoFromPlaylist,
      addVideoToPlaylist,
      getUserPlaylists,
      addVideoToPlaylist,
      updatePlaylist
  }