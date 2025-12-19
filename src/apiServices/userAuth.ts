import { data } from "react-router-dom";
import { apiBaseUrl } from "../lib/constsants";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";



// function getData(){
//    console.log(apiBaseUrl);

// axios.get(`${apiBaseUrl}/health`)

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
    const response = await axios.get(`${apiBaseUrl}/health`);
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
  const fromData = new FormData();
  fromData.append("username", userData.username);
  fromData.append("email", userData.email);
  fromData.append("fullName", userData.fullName);
  fromData.append("password", userData.password);
  fromData.append("avatar", userData.avatar);
  try {
    console.log("userData", userData);
    const response = await axios.post(
      `${apiBaseUrl}/users/register`,
      fromData,
      {
        // headers: {
        //    Accept: "application/json",
        // }
      }
    );
    console.log("user registered", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Registration failed", error);
    throw error;
  }
}

async function loginWithUsername(username: string, password: string) {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/users/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    console.log("Login Success", response.data);
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
}
async function loginWithEmail(email: string, password: string) {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/users/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log("Login Success", response.data);
    return response.data;
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const response = await axiosInstance.get("/users");
    const data = response.data
   if(!data?.success){
    throw new Error(data.message || "Failed to getCurrent user")
   }
   console.log('data', data)
   return data.data
  } catch (error:any) {
    throw new Error(error?.message)
  }
}

// const apiBaseUrl = "http://localhost:8000/api/v1"; // adjust if needed

async function logoutUser() {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/users/logout`,
      {},
      { withCredentials: true } // ✅ ensures cookies (accessToken) are sent
    );
    return response.data;
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
}


async function refreshToken() {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/users/refresh-token`,
      {},
      { withCredentials: true }
    );
    return response.data

  } catch (error) {
    console.log("error", error)
  }
}

const updateAccountDetails = async () => {
  try {
    const respone = await axios.patch(
      `${apiBaseUrl}/update`,
      data,
      { withCredentials: true }
    )
    return respone.data
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

const updateUserAvatar = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axios.patch(`${apiBaseUrl}/avatar`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Avatar updated successfully:", response.data);
    return response.data;

  } catch (error: any) {
    console.error("Error updating avatar:", error.response?.data || error.message);
    throw error;
  }
};
const changePassword = async (data: any) => {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/change-password`,
      data,
      { withCredentials: true }
    )
    return response.data
  } catch (error: any) {
    console.error("Error changing password:", error.response?.data || error.message);
    throw error;

  }
}

const getUserChannelProfile = async (username: string) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/c/${username}`,


      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    console.log('error', error)
  }
}

const getUserWatchHistory = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/watch-history`,

      { withCredentials: true }
    )
    return response.data

  } catch (error) {
    console.log('error', error)
    throw error

  }
}

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
  getUserWatchHistory
};
