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
    if (response?.data) {
      const customerData = {
        email: response.data?.email,
        mobile: response.data?.mobile,
        name: response.data?.name,
      };

      localStorage.setItem("customer", JSON.stringify(customerData));
    }
    window.location.reload();
  } catch (error) {
    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("customer");

      await handleForceLogout();
    }
    console.log(error);
  }
};

const handleForceLogout = async () => {
  try {
    await axiosInstance.post(`${baseUrl}/user/logout`, null, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(("eeeeeeee", error));
    if (error.response?.status === 403) {
      window.location.href = "/signin";
    }
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const getToken = localStorage.getItem("token");
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
    try {
      if (error.response) {
        if (error.response.status === 401) {
          await handleRefresh();
        } else if (error.response.status === 403) {
          console.log("403 error");
        }
      }
    } catch (refreshError) {
      console.log("refresh error", refreshError);
      throw refreshError;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
