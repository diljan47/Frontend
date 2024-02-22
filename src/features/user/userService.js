import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";
const register = async (userData) => {
  const response = await axios.post(`${baseUrl}/user/register`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};
const login = async (userData) => {
  const response = await axios.post(`${baseUrl}/user/login`, userData);
  if (response.data) {
    return response.data;
  }
};
const userWishlist = async () => {
  const response = await axios.get(`${baseUrl}/user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (data) => {
  const response = await axios.post(`${baseUrl}/user/cart/`, data, config);
  if (response.data) {
    return response.data;
  }
};

const getUserCart = async () => {
  const response = await axios.get(`${baseUrl}/user/`, config);
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  userWishlist,
  addToCart,
  getUserCart,
};
