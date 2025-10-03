import { apiBaseUrl } from "../lib/constsants";
import axios from "axios";

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
    return response.data
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const response = await axios.get(`${apiBaseUrl}/users/current-user`, {
      withCredentials: true,
    });
    console.log("getCurrent users", response.data);
  } catch (error) {
    console.log("getCurrent user sucessfuly");
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



  

export { checkApiHealth, registerUser, loginWithUsername, getCurrentUser ,loginWithEmail,logoutUser};
