import { apiClient } from "@/lib/apiClient";
import { handleError } from "@/lib/hadleError";


// function getData(){
//    console.log(apiBaseUrl);

// apiClient.get(`${apiBaseUrl}/health`)

// .then(function(response){
//    console.log(response.data)

// })
// .catch(function(error){
//    console.log(error)
// })
// .finally(function(){
//    console.log('finally run this')
// })
// }

// getData()

async function checkApiHealth() {
  try {
    const response = await apiClient.get(`/health`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally run this");
  }
}
export type RegisterType = {
  username: string;
  email: string;
  fullName: string;
  avatar: File | string;
  password: string;
};

async function registerUser(userData: RegisterType) {
  const formData = new FormData();

  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("fullName", userData.fullName);
  formData.append("password", userData.password);

  if (userData.avatar instanceof File) {
    formData.append("avatar", userData.avatar);
  }

  try {
    const response = await apiClient.post("/users/register", formData);
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
}

async function loginWithUsername(username: string, password: string) {
  try {
    const response = await apiClient.post(`/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
}
async function loginWithEmail(email: string, password: string) {
  try {
    const response = await apiClient.post(`/users/login`, {
      email,
      password,
    });
    return response.data;
  }catch (error:unknown) {
throw new Error(handleError(error));
}
}

async function getCurrentUser() {
  try {
    const response = await apiClient.get("/users");
    const data = response.data;
    if (!data?.success) {
      throw new Error(data.message || "Failed to getCurrent user");
    }
    // console.log("data", data);
    return data.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
  }


// const apiBaseUrl = "http://localhost:8000/api/v1"; // adjust if needed

async function logoutUser() {
  try {
    const response = await apiClient.post(`/users/logout`, {});
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
}

async function refreshToken() {
  try {
    const response = await apiClient.post(`/users/refresh-token`, {});
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
}

const updateAccountDetails = async (data:{
  fullName:string;
  email:string
}) => {
  try {
    const respone = await apiClient.patch(`/users/update`, data);
    return respone.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
  
};

const updateUserAvatar = async (formData: FormData) => {
  try {
    const response = await apiClient.post(
      "/users/update-avatar", // ✅ correct route
      formData
    );

    console.log("Avatar updated successfully:", response.data);
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};
const changePassword = async (data:unknown) => {
  try {
    const response = await apiClient.patch(`/users/change-password`, data);
    return response.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

const getUserWatchHistory = async () => {
  try {
    const { data } = await apiClient.get("/users/watch-history", {
      withCredentials: true,
    });
    return data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

export const addToWatchHistory = async (videoId: string) => {
  try {
    const { data } = await apiClient.post(
      `/users/watch-history/add/${videoId}`,
      {},
      { withCredentials: true }
    );
    return data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

const getUserChannelProfile = async (username: string) => {
  try {
    const response = await apiClient.get(`/users/c/${username}`);
    return response.data.data;
  } catch (error:unknown) {
throw new Error(handleError(error));
}
};

export {
  checkApiHealth,
  registerUser,
  loginWithUsername,
  getCurrentUser,
  loginWithEmail,
  logoutUser,
  refreshToken,
  updateAccountDetails,
  updateUserAvatar,
  changePassword,
  getUserChannelProfile,
  getUserWatchHistory,
};
