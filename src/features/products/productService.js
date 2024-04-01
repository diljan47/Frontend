import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getProducts = async (queryUrl) => {
  if (queryUrl) {
    console.log(queryUrl);
  }
  const response = await axios.get(
    `${baseUrl}/products?${queryUrl.sort ? `sort=${queryUrl.sort}&` : ""}${
      queryUrl.brand ? `brand=${queryUrl.brand}&` : ""
    }${queryUrl.gender ? `gender=${queryUrl?.gender}&` : ""}${
      queryUrl.categories ? `categories=${queryUrl?.categories}&` : ""
    }${queryUrl.color ? `color=${queryUrl?.color}&` : ""}${
      queryUrl.priceRange ? `priceRange=${queryUrl?.priceRange}&` : ""
    }${queryUrl.minRating ? `minrating=${queryUrl?.minRating}&` : ""}`
  );

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
