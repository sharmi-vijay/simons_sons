import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";
import invoicesReducer from "../features/invoices/invoicesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    invoices: invoicesReducer,
  },
});
