import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Shop = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="h-full shadow-lg">
        <Sidebar />
      </div>
      <div className="w-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Shop;