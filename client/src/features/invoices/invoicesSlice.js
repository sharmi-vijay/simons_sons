import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoicesList: [],
  productsCart: [],
  totalCost: 0,
  isLoading: false,
  isSuccess: false,
  isDelSuccess: false,
  isError: false,
  message: "",
};

// JWT Token
const token = localStorage.getItem("credentials")
  ? JSON.parse(localStorage.getItem("credentials")).token
  : "";

// CREATE
export const createInvoice = createAsyncThunk(
  "invoices/add",
  async (invoice, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/invoices/add",
        invoice,
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
export const getAllInvoices = createAsyncThunk(
  "invoices/getall",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/invoices/getall",
        {
          headers: {
            "Auth-Token": credentials.token,
            customerId: credentials.id,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// SEARCH
export const searchInvoices = createAsyncThunk(
  "invoices/search",
  async (Data, thunkAPI) => {
    try {
      // console.log(Data);
      const response = await axios.post(
        "http://localhost:5000/api/invoices/search",
        Data,
        {
          headers: {
            "Auth-Token": token,
            customerId: Data.customerId,
          },
        }
      );
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deleteInvoice = createAsyncThunk(
  "invoices/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/invoices/delete/${id}`,
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

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    addToCart: (state, action) => {
      const name = action.payload.name;
      const cost = action.payload.price;
      state.totalCost += Number(cost);
      state.productsCart = [...state.productsCart, name];
    },
    removeFromCart: (state, action) => {
      const name = action.payload.name;
      const cost = action.payload.price;
      state.totalCost -= Number(cost);
      state.productsCart.splice(name, 1);
    },
    removeAllFromCart: (state) => {
      state.totalCost = 0;
      state.productsCart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create invoice record
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isDelSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Record created successfully!";
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Read all invoice records
      .addCase(getAllInvoices.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isDelSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Got all records successfully!";
        state.invoicesList = action.payload;
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // search invoice records by users
      .addCase(searchInvoices.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isDelSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(searchInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Got search successfully!";
        state.invoicesList = action.payload;
      })
      .addCase(searchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete invoice record
      .addCase(deleteInvoice.pending, (state) => {
        state.isLoading = true;
        state.isDelSuccess = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelSuccess = true;
        state.isError = false;
        state.message = "Record deleted successfully!";
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isDelSuccess = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Record deletion failed";
      });
  },
});

// Action creators are generated for each case reducer function
// Changes
export const { addToCart, removeFromCart, removeAllFromCart, reset } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;

