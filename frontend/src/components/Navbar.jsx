import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/images/logo.png";
import { AuthContext } from "../context/authContext";
import { post } from "../utils/api";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  console.log(currentUser);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="h-25 px-6 md:px-12 flex justify-between items-center w-full bg-white ">
      {/* Logo */}
      <div>
        <img src={logo1} alt="Logo" className="h-16 w-16" />
      </div>

      {/* Navigation Links - Hidden on mobile, flex on larger screens */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/"
          className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </Link>

        <div className="relative">
          <select className="bg-transparent border-none text-gray-700 focus:outline-none">
            <option value="" disabled className="text-center">
              Categories
            </option>
            <option value="new-arrivals " className="text-center">
              New Arrivals
            </option>
            <option value="best-sellers" className="text-center">
              Best Sellers
            </option>
            <option value="featured-products" className="text-center">
              Featured Products
            </option>
          </select>
        </div>

        <Link
          to="/shop"
          className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full"
        >
          Shop
        </Link>
        <Link
          to="/blog"
          className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full"
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full"
        >
          Contact
        </Link>
      </div>

      {/* Search Input */}
      <div className="hidden md:flex items-center rounded-2xl">
        <input
          type="search"
          placeholder="Search..."
          className="h-10 w-40 md:w-70 border-2 border-gray-300 rounded-lg px-4 focus:outline-none"
        />
      </div>

      {/* User and Cart Icons */}
      <div className="flex items-center space-x-4 gap-4">
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer p-2 px-4 bg-red-500 hover:bg-red-400 rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/Login"
            className="flex items-center bg-blue-500 p-2 px-4 rounded-md hover:underline"
          >
            <i className="fa-regular fa-user text-lg mr-2"></i>
            <p className="hidden md:block">Login</p>
          </Link>
        )}
        {currentUser ? (
          <Link
            to="/cart"
            className="justify-center items-center text-2xl flex flex-col text-gray-800"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            <p className="text-[1.2rem]">cart</p>
          </Link>
        ) : (
          <Link
            to="/login"
            className="justify-center items-center text-2xl flex flex-col text-gray-800"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            <p className="text-[1.2rem]">cart</p>
          </Link>
        )}

        {/* Dashboard Button */}
        {currentUser && (
          <Link to="/dashboard">
            <button className="bg-blue-600 text-white h-10 w-10 rounded-full text-sm hover:bg-blue-800 transition duration-300">
              D
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-2xl">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
