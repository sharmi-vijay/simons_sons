import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const initialState = {
//   productList: [],
//   wishlist: [],
//   productsCategory: [
//     "Paper Items",
//     "Writing Accessories",
//     "Desktop Items",
//   ],
//   singleProduct: null,
//   isUpdate: false,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
// };

// JWT Token
const token = localStorage.getItem("credentials")
  ? JSON.parse(localStorage.getItem("credentials")).token
  : "";

//  WISHLIST LOCAL STORAGE
const saveWishlistToLocalStorage = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

// CREATE
export const addProduct = createAsyncThunk(
  "products/add",
  async (product, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        product,
        {
          headers: {
            "Auth-Token": token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// READ
export const getAllProducts = createAsyncThunk(
  "products/getall",
  async (jwtToken, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/getall",
        {
          headers: {
            "Auth-Token": jwtToken,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/update",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/update/${data._id}`,
        data,
        {
          headers: {
            "Auth-Token": token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/delete/${id}`,
        {
          headers: {
            "Auth-Token": token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// FETCH PRODUCT DETAILS (INCLUDING REVIEWS)
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue("Product ID is missing!");
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching product details");
    }
  }
);


// SUBMIT A REVIEW
export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ reviewData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/products/${reviewData.productId}/reviews`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding review");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    productDetails: {},
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    productsCategory: ["Paper Items", "Writing Accessories", "Desktop Items"],
    singleProduct: null,
    isUpdate: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.wishlist.some((item) => item._id === product._id)) {
        state.wishlist.push(product);
        saveWishlistToLocalStorage(state.wishlist);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter((item) => item._id !== productId);
      saveWishlistToLocalStorage(state.wishlist);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      saveWishlistToLocalStorage(state.wishlist);
    },
    setDatatoForm: (state, action) => {
      state.singleProduct = action.payload;
      state.isUpdate = true;
    },
    reset: (state) => {
      state.singleProduct = null;
      state.isUpdate = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Product added successfully!");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Read all products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productList = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Product deleted successfully!");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Product deletion failed";
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = true;
        state.singleProduct = null;
        toast.success("Product updated successfully!");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch Product Details
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productDetails.reviews.push(action.payload);
        toast.success("Review added successfully!");
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});


// Action creators are generated for each case reducer function
// Changes
export const { reset, setDatatoForm, addToWishlist, removeFromWishlist, clearWishlist, setWishlist } = productsSlice.actions;

export default productsSlice.reducer;
