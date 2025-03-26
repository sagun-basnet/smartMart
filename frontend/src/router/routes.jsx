import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: "", element: <ProductsList /> }],
  },
  {
    path: "/products",
    element: <DashboardLayout />,
    children: [{ path: "", element: <ProductsList /> }],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: "", element: <ProductsList /> }],
  },
  {
    path: "/products",
    element: <DashboardLayout />,
    children: [{ path: "", element: <ProductsList /> }],
  },
  {
    path: "/add-product",
    element: <AddProduct />,
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
    path: "/product/checkout/:id",
    element: <Checkout />,
  },
  {
    path: "/finished/:pid",
    element: <Finished />,
  },

  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default AppRoutes;
