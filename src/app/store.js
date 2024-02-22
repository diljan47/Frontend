import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import prodReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: prodReducer,
  },
});
