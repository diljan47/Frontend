import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "sonner";

const getCustomerLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
const initialState = {
  user: getCustomerLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkapi) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkapi) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getuserWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkapi) => {
    try {
      return await authService.userWishlist();
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const addProductsToCart = createAsyncThunk(
  "user/cart/add",
  async (data, thunkapi) => {
    try {
      const result = await authService.addToCart(data);
      thunkapi.dispatch(getCart());
      return result;
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteAProdCart = createAsyncThunk(
  "user/cart/delete",
  async (data, thunkapi) => {
    try {
      const result = await authService.deleteACart(data);
      return result;
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk("user/cart/get", async (thunkapi) => {
  try {
    return await authService.getUserCart();
  } catch (error) {
    return thunkapi.rejectWithValue(error);
  }
});
export const updateQuantityFromCart = createAsyncThunk(
  "user/cart/update",
  async (quantityUpdate, thunkapi) => {
    try {
      return await authService.updateQuantity(quantityUpdate);
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.success("User created");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.response?.data;
        toast.error(state.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          console.log("inside userSlice", action.payload?.token);
          localStorage.setItem("token", action.payload.token);
          toast.success("Sign in successfull");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.response?.data;
        toast.error(state.message);
      })
      .addCase(getuserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getuserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "wishlist error";
      })
      .addCase(addProductsToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductsToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userCart = action.payload;
        if (state.isSuccess === true) {
          toast.success("Products Added To Cart");
        }
      })
      .addCase(addProductsToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.warning("Please Login To Add Products");
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userCart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteAProdCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProdCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCart = action.payload;
      })
      .addCase(deleteAProdCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message;
        toast.error(state.message);
      })
      .addCase(updateQuantityFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantityFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCart = action.payload;
      })
      .addCase(updateQuantityFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message;
        toast.error(state.message);
      });
  },
});
export default authSlice.reducer;
