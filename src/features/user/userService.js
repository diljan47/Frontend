import axiosInstance from "../../utils/axiosConfig";
const baseUrl = process.env.baseURL;

const register = async (userData) => {
  const response = await axiosInstance.post(
    `${baseUrl}/user/register`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};
const login = async (userData) => {
  const response = await axiosInstance.post(`${baseUrl}/user/login`, userData);
  if (response.data) {
    const customerData = {
      email: response.data?.email,
      mobile: response.data?.mobile,
      name: response.data?.name,
    };

    localStorage.setItem("customer", JSON.stringify(customerData));
    return response.data;
  }
};
const userLogout = async () => {
  const response = await axiosInstance.post(`${baseUrl}/user/logout`);
  if (response.data) {
    return response.data;
  }
};
const userWishlist = async () => {
  const response = await axiosInstance.get(`${baseUrl}/user/wishlist`);
  if (response.data) {
    return response.data;
  }
};
const addWishlist = async (prodId) => {
  const response = await axiosInstance.put(`${baseUrl}/user/add-to-wishlist`, {
    prodId,
  });
  if (response.data) {
    return response.data.wishlist;
  }
};

const removeFromWishlist = async (prodId) => {
  const response = await axiosInstance.post(`${baseUrl}/user/remove-wishlist`, {
    prodId,
  });
  if (response.data) {
    return response.data.wishlist;
  }
};

const addToCart = async (data) => {
  const response = await axiosInstance.post(`${baseUrl}/user/cart/`, data);
  if (response.data) {
    return response.data;
  }
};

const getUserCart = async () => {
  const response = await axiosInstance.get(`${baseUrl}/user/`);
  if (response.data) {
    return response.data;
  }
};
const deleteACart = async (prodId) => {
  const response = await axiosInstance.delete(
    `${baseUrl}/user/delete-product/${prodId}`
  );
  if (response.data) {
    return response.data;
  }
};

const emptyACart = async () => {
  const response = await axiosInstance.delete(`${baseUrl}/user/empty-cart`);
  if (response.data) {
    return response.data;
  }
};

const updateQuantity = async (quantityUpdate) => {
  const response = await axiosInstance.put(`${baseUrl}/user/update-usercart/`, {
    prodId: quantityUpdate?.prodId,
    newQuantity: quantityUpdate?.newQuantity,
  });
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (data) => {
  const response = await axiosInstance.post(`${baseUrl}/user/order`, data);
  if (response.data) {
    return response.data;
  }
};

const getOrder = async () => {
  const response = await axiosInstance.get(`${baseUrl}/user/orders`);
  if (response.data) {
    return response.data;
  }
};
export const authService = {
  register,
  login,
  userLogout,
  userWishlist,
  addWishlist,
  removeFromWishlist,
  addToCart,
  getUserCart,
  emptyACart,
  updateQuantity,
  deleteACart,
  createOrder,
  getOrder,
};
