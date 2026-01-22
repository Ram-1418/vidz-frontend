import { apiClient } from "@/lib/apiClient";

import handleError from "@/lib/hadleError";

async function createPlaylist(playlistData: string) {
  try {
    const response = await apiClient.post(`/playlists`, playlistData, {});
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}

async function deletePlaylist(playlistId: string) {
  try {
    const respone = await apiClient.delete(`/playlists/${playlistId}`);
    return respone.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}

async function getPlaylistById(playlistId: string) {
  try {
    const respone = await apiClient.get(`/playlists/${playlistId}`, {});
    return respone.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}
async function updatePlaylist(playlistId: string, playlistData: string) {
  try {
    const response = await apiClient.patch(
      `/playlists/${playlistId}`,
      playlistData,
    );
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}
async function removeVideoFromPlaylist(playlistId: string, videoId: string) {
  try {
    const response = await apiClient.patch(
      `/playlists/${playlistId}/remove/${videoId}`,
    );
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}

async function addVideoToPlaylist(playlistId: string, videoId: string) {
  try {
    const response = await apiClient.patch(
      `/playlists/${playlistId}/add/${videoId}`,
    );

    return response.data;
  } catch (error: unknown) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}
async function getUserPlaylists(userId: string) {
  try {
    const response = await apiClient.get(`/playlists/user/${userId}`);
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error("Error adding comment:", message || error);
    throw new Error(message || "Failed to add comment");
  }
}

export {
  getPlaylistById,
  deletePlaylist,
  removeVideoFromPlaylist,
  getUserPlaylists,
  addVideoToPlaylist,
  updatePlaylist,
  createPlaylist,
};
