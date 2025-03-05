import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductsList from "../pages/products/ProductList";
import Home from "../pages/Home";
import NotFound from "../pages/PageNotFound"
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";




const AppRoutes = createBrowserRouter([
    {
        path: "/", element: <MainLayout />,
        children: [
            {
                path: "/", element: <Home />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "", element: <ProductsList /> }
        ],
    },
    {
        path: "/products",
        element: <DashboardLayout />,
        children: [
            { path: "", element: <ProductsList /> }
        ],
    },



    { path: "*", element: <NotFound /> }, // 404 Page
]);

export default AppRoutes;
