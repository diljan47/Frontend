import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
//

const createConfig = () => {
  const getToken = localStorage.getItem("token");
  console.log("from config", getToken);
  return {
    headers: {
      authorization: `Bearer ${getToken ? getToken : null}`,
      Accept: "application/json",
    },
  };
};

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
  const response = await axios.get(`${baseUrl}/user/wishlist`, createConfig());
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (data) => {
  const response = await axios.post(
    `${baseUrl}/user/cart/`,
    data,
    createConfig()
  );
  if (response.data) {
    return response.data;
  }
};

const getUserCart = async () => {
  const response = await axios.get(`${baseUrl}/user/`, createConfig());
  if (response.data) {
    return response.data;
  }
};
const deleteACart = async (prodId) => {
  const response = await axios.delete(
    `${baseUrl}/user/delete-product/${prodId}`,
    createConfig()
  );
  if (response.data) {
    return response.data;
  }
};

const updateQuantity = async (quantityUpdate) => {
  const response = await axios.put(
    `${baseUrl}/user/update-usercart/`,
    {
      prodId: quantityUpdate?.prodId,
      newQuantity: quantityUpdate?.newQuantity,
    },
    createConfig()
  );
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
  updateQuantity,
  deleteACart,
};
