import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: localStorage.getItem("credentials")
    ? JSON.parse(localStorage.getItem("credentials"))
    : "",
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// REGISTER
export const signUp = createAsyncThunk(
  "user/signup",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        user
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LOGIN
export const logIn = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        credentials
      );

      //   console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      //   console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.clear();
      state.credentials = {};
      state.isSuccess = false;
      state.isLoggedIn = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Registered successfully!";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // LOGIN
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Successfully logged in!";
        state.credentials = action.payload;
        state.isLoggedIn = action.payload.success;
        // Local storage
        localStorage.setItem("credentials", JSON.stringify(action.payload));
        localStorage.setItem(
          "isLoggedIn",
          JSON.stringify(action.payload.success)
        );
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logOut } = usersSlice.actions;

export default usersSlice.reducer;
