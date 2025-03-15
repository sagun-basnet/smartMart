import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductsList from "../pages/products/ProductList";
import Home from "../pages/Home";
import NotFound from "../pages/PageNotFound";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ShoppingCart from "../pages/ShoppingCart";
import AddProduct from "../components/AddProduct";
import CheckOut from "../pages/CheckOut";
const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> }, // Home route
      { path: "/shoppingCart", element: <ShoppingCart /> }, // ShoppingCart route
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <ProductsList /> }, // Products List for Dashboard
    ],
  },

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/checkout",
    element: <CheckOut />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/add-product",
    element: <AddProduct />
  },
  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default AppRoutes;
