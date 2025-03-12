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

const AppRoutes = createBrowserRouter([
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
    path: "/single-product",
    element: <SingleProduct />,
  },

  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default AppRoutes;
