import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productsCategory: [
    "Mobile",
    "Laptops & Computers",
    "Home Electronics",
  ],
  singleProduct: null,
  isUpdate: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// JWT Token
const token = localStorage.getItem("credentials") 
  ? JSON.parse(localStorage.getItem("credentials")).token
  : "";

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

export const productsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Changes
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
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Product added successfully!";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Read all products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = false;
        state.isError = false;
        state.message = "Product added successfully!";
        state.productList = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Product deleted successfully!";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Product deletion failed";
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isUpdate = true;
        state.singleProduct = null;
        state.message = "Product Updated successfully!";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
// Changes
export const { reset, setDatatoForm } = productsSlice.actions;

export default productsSlice.reducer;
