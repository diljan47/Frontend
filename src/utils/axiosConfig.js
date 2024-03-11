import axios from "axios";
import { baseUrl } from "./baseUrl";

const axiosInstance = axios.create({ baseURL: baseUrl, withCredentials: true });
const handleRefresh = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/refresh`, {
      withCredentials: true,
    });
    if (response?.data?.newaccessToken) {
      localStorage.setItem("token", response?.data?.newaccessToken);
    }
  } catch (error) {
    console.error("Error refreshing token:", error.message);
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const getToken = localStorage.getItem("token");
    if (getToken == null) {
      console.log("no token");
    }
    config.headers.Authorization = `Bearer ${getToken || ""}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("401 error", error.response.status);
      try {
        await handleRefresh();
        window.location.reload();
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
        throw refreshError;
      }
    }
    console.log("Error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
