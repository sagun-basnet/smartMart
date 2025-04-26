import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const D_Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-[calc(100%-16rem)] fixed ml-64 bg-white shadow-md p-4 flex justify-between items-center rounded-lg">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default D_Navbar;
