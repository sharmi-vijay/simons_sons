import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactList: [], // You can remove this if no fetching is required
  singleContact: null,
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
export const addContact = createAsyncThunk(
  "contacts/add",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact/add",
        contact,
        {
          headers: {
            "Auth-Token": token,
            "Content-Type": "application/json",
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.singleContact = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Contact added successfully!";
        state.singleContact = action.payload; // Optional, for reference
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators
export const { resetContactState } = contactSlice.actions;

export default contactSlice.reducer;
