import { Outlet } from "react-router-dom";
import D_Sidebar from "./D_Sidebar";
import D_Navbar from "./D_Navbar"

const DashboardLayout = () => {
  return (
    <div className="flex h-screen ">
      <D_Sidebar />
      <div className="flex flex-col flex-1 ">
        <D_Navbar />
        <div className="p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
