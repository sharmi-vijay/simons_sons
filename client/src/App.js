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

function App() {
  const user = useSelector((state) => state.users.isLoggedIn);

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
