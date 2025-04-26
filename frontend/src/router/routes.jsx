import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductsList from "../pages/products/ProductList";
import Home from "../pages/Home";
import NotFound from "../pages/PageNotFound";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AddProduct from "../components/AddProduct";
import SingleProduct from "../components/SingleProduct";
import ShoppingCart from "../components/ShoppingCart";
import Shop from "../components/shop/Shop";
import AllProduct from "../components/shop/AllProduct";
import Clothes from "../components/shop/category/Clothes";
import Watches from "../components/shop/category/Watches";
import Electronics from "../components/shop/category/Electronics";
import Groceries from "../components/shop/category/Groceries";
import Checkout from "../components/Checkout";
import Finished from "../components/Finished";
import EditProduct from "../pages/products/EditProduct";
import StoreMapSVG from "../components/StoreMapSVG";
import IndoorMapPage from "../components/IndoorMapPage";
import SmartMartMap from "../components/SmartMartMap";
import Sales from "../components/Sales";
import OrderHistory from "../components/OrderHistory";
import OrderManagement from "../components/OrderManagement";
import TransactionManagement from "../components/TransactionManagement";
import VerifyOtp from "../pages/Verifyotp";
import ForgetPassword from "../components/ForgetPassword";
import VerifyOtpAndReset from "../components/VerifyOtpAndReset";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/shoppingCart", element: <ShoppingCart /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "product", element: <ProductsList /> },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "order",
        element: <OrderManagement />,
      },
      {
        path: "transaction",
        element: <TransactionManagement />,
      },
    ],
  },
  {
    path: "/shop",
    element: <Shop />,
    children: [
      { path: "/shop", element: <AllProduct /> },
      { path: "/shop/Clothes", element: <Clothes /> },
      { path: "/shop/Watches", element: <Watches /> },
      { path: "/shop/Electronics", element: <Electronics /> },
      { path: "/shop/Groceries", element: <Groceries /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-otp-reset",
    element: <VerifyOtpAndReset />,
  },
  {
    path: "/order-history",
    element: <OrderHistory />,
  },
  {
    path: "/store-map",
    element: <SmartMartMap />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/edit-product/:id",
    element: <EditProduct />,
  },
  {
    path: "/products/:id",
    element: <SingleProduct />,
  },
  {
    path: "/product/checkout",
    element: <Checkout />,
  },
  {
    path: "/finished/:pid",
    element: <Finished />,
  },

  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default AppRoutes;
