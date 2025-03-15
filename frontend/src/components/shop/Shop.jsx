import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Shop = () => {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Shop;
