import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
// import { config } from "../../utils/axiosConfig";

const createConfig = () => {
  const getToken = localStorage.getItem("token");
  return {
    headers: {
      authorization: `Bearer ${getToken ? getToken : null}`,
      Accept: "application/json",
    },
  };
};

const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  if (response.data) {
    return response.data;
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
  singleProduct,
};
