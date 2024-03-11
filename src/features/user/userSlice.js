import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "sonner";

const getCustomerLocalStorage = localStorage.getItem("customer");
const customerData = getCustomerLocalStorage
  ? JSON.parse(getCustomerLocalStorage)
  : null;

const initialState = {
  user: customerData,
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

export const logOutUser = createAsyncThunk("auth/logout", async (thunkapi) => {
  try {
    return await authService.userLogout();
  } catch (error) {
    return thunkapi.rejectWithValue(error);
  }
});

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

export const addToWishlist = createAsyncThunk(
  "user/wishlist/add",
  async (prodId, thunkapi) => {
    try {
      return await authService.addWishlist(prodId);
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

export const createOrderCart = createAsyncThunk(
  "user/create/order",
  async (data, thunkapi) => {
    try {
      return await authService.createOrder(data);
    } catch (error) {
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getUserOrder = createAsyncThunk(
  "user/get/order",
  async (thunkapi) => {
    try {
      return await authService.getOrder();
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
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = initialState?.user;
        state.userCart = initialState?.userCart;
        state.userWishlist = initialState?.userWishlist;
        state.updatedCart = initialState?.updatedCart;
        state.deletedCart = initialState?.deletedCart;
        state.createdOrder = initialState?.createdOrder;
        state.userOrder = initialState?.userOrder;
        state.wishlist = initialState?.wishlist;
        state.loggedOut = true;

        if (state.isSuccess === true) {
          toast.success("Logged out successfully");
        }
      })

      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.loggedOut = false;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      })
      .addCase(getuserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getuserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "wishlist error";
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userWishlist = action.payload;
        state.message = "added to wishlist";
        if (state.isSuccess === true) {
          toast.success("added to wishlist");
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.messsage;
        console.log(state.message);
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
        toast.error("Something went wrong");
      })
      .addCase(createOrderCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdOrder = action.payload;
      })
      .addCase(createOrderCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error("Something went wrong");
      })
      .addCase(getUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userOrder = action.payload;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error("Something went wrong");
      });
  },
});
export default authSlice.reducer;
