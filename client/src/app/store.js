import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";
import invoicesReducer from "../features/invoices/invoicesSlice";
import contactReducer from "../features/contact/contactSlice"


export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    invoices: invoicesReducer,
    contacts: contactReducer,
    // wishlist: wishlistReducer,
  },
});


