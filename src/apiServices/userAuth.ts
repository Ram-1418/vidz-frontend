import { apiClient } from "@/lib/apiClient";
import { data } from "react-router-dom";

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
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

async function loginWithUsername(username: string, password: string) {
  try {
    const response = await apiClient.post(`/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
}
async function loginWithEmail(email: string, password: string) {
  try {
    const response = await apiClient.post(`/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const response = await apiClient.get("/users");
    const data = response.data;
    if (!data?.success) {
      throw new Error(data.message || "Failed to getCurrent user");
    }
    console.log("data", data);
    return data.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// const apiBaseUrl = "http://localhost:8000/api/v1"; // adjust if needed

async function logoutUser() {
  try {
    const response = await apiClient.post(`/users/logout`, {});
    return response.data;
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
}

async function refreshToken() {
  try {
    const response = await apiClient.post(`/users/refresh-token`, {});
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

const updateAccountDetails = async () => {
  try {
    const respone = await apiClient.patch(`/update`, data);
    return respone.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const updateUserAvatar = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await apiClient.patch(`/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Avatar updated successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating avatar:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
const changePassword = async (data: any) => {
  try {
    const response = await apiClient.patch(`/change-password`, data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error changing password:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

const getUserChannelProfile = async (username: string) => {
  try {
    const response = await apiClient.get(`/c/${username}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

const getUserWatchHistory = async () => {
  try {
    const response = await apiClient.get(
      `/watch-history`,

      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
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
