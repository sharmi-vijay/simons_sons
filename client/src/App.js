import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";
import AddProducts from "./pages/Admin/AddProducts/AddProducts";
import { ToastContainer } from "react-toastify";
import Shop from "./pages/Shop/Shop";
import Invoices from "./pages/Invoices/Invoices";
import NoPage from "./pages/NoPage/NoPage";
import Contact from "./pages/Contact/Contact";
import AboutPage from "./pages/About/About";
import Wishlist from "./pages/WishList/Wishlist";
import { setWishlist } from "./features/products/productsSlice";
import { useEffect, } from "react";
import { useDispatch } from "react-redux";
import Receipt from "./pages/Receipt/Receipt";
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductList/productDetails";


function App() {
  const user = useSelector((state) => state.users.isLoggedIn);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    dispatch(setWishlist(savedWishlist));
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<Shop />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="receipt" element={<Receipt />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="addproducts" element={<AddProducts />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
