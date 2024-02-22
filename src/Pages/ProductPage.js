import React, { useEffect } from "react";
import Category from "../Components/Category/Category";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const prodData = useSelector((state) => state.product.product.data);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <>
      <Category prodData={prodData ? prodData : []} />
    </>
  );
};

export default ProductPage;
