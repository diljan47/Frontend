import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  if (response.data) {
    return response.data;
  }
};

const addWishlist = async (prodId) => {
  const response = await axios.put(
    `${baseUrl}/products/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data.wishlist;
  }
};

const singleProduct = async (prodId) => {
  const response = await axios.get(`${baseUrl}/products/${prodId}`);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addWishlist,
  singleProduct,
};
