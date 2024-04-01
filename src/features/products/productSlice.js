import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { productService } from "./productService";

const productState = {
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const getAllProducts = createAsyncThunk(
  "product/all",
  async (queryUrl, thunkapi) => {
    try {
      return await productService.getProducts(queryUrl);
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/single",
  async (id, thunkapi) => {
    try {
      return await productService.singleProduct(id);
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Product Fetched";
        state.product = action.payload;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "An error occurred";
      });
  },
});

export default productSlice.reducer;
