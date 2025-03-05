import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";

const App = () => {
  const Layout = () => {
    return <Outlet />;
  };
  const router = new createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
      path: "/add-product",
      element: <AddProduct />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
