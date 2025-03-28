import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/images/logo.png";
import { AuthContext } from "../context/authContext";
import { MdDashboard, MdMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { get, post } from "../utils/api";
import { io } from "socket.io-client";
const socket = io("http://localhost:5555");
import { toast } from "react-toastify";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState([]);
  const [open, setOpen] = useState(false);
  // console.log(currentUser);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        // Fetch stored notifications from MySQL
        const res = await get("/notifications");
        console.log(res, 21);

        setNotifications(res); // No need for `.json()`, Axios already parses JSON

        // Listen for real-time notifications
        socket.on("notification", (newNotification) => {
          setNotification((prev) => [newNotification, ...prev]);
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchApi(); // Call the async function

    return () => {
      socket.off("notification"); // Clean up the socket listener
    };
  }, [notification]);
  // console.log(notification, ": Notification");

  const handleLogout = async () => {
    await logout();
  };
  const convertToNepaliTime = (utcDate) => {
    const date = new Date(utcDate);

    // Format date and time separately
    const formattedDate = date.toLocaleDateString("en-US", {
      timeZone: "Asia/Kathmandu",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kathmandu",
    });

    return { formattedDate, formattedTime };
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
        {currentUser?.role_id === 2 ? (
          <>
            <div className="flex justify-center items-center gap-8">
              <Link
                to="/shoppingCart"
                className="justify-center items-center text-2xl flex flex-col text-gray-800"
              >
                <i className="fa-solid fa-bag-shopping"></i>
                <p className="text-[1.2rem]">cart</p>
              </Link>
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer transition-all grid place-items-center rounded-full hover:bg-[#c8c8c8] p-2 bg-[#f1f1f1]"
              >
                <IoIosNotifications className="text-3xl" />
              </div>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            onClick={() => toast.error("Login to see cart..")}
            className="justify-center items-center text-2xl flex flex-col text-gray-800"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            <p className="text-[1.2rem]">cart</p>
          </Link>
        )}

        {/* Dashboard Button */}
        {currentUser?.role_id === 1 && (
          <Link to="/dashboard">
            <button className="cursor-pointer bg-blue-600 text-white h-10 w-10 rounded-full text-sm hover:bg-blue-800 transition duration-300 flex justify-center items-center">
              <MdDashboard className="text-xl" />
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
      {open && (
        <div className="hide flex flex-col absolute z-50 top-[5rem] right-8 border-1 bg-[#f1f1f1] shadow-lg h-[calc(100vh-5rem)] w-[25rem] overflow-y-scroll">
          {notifications.map((item, index) => {
            const { formattedDate, formattedTime } = convertToNepaliTime(
              item.created_at
            );
            return (
              <>
                <div className="flex border-b-1 p-2 gap-4">
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <MdMessage className="text-4xl text-blue-500" />
                    <span className="text-sm font-bold">
                      {formattedDate} <br /> {formattedTime}
                    </span>
                  </div>
                  <div className="h-auto w-1 bg-black"></div>
                  <div className="flex  flex-col justify-center items-center gap-1">
                    <h2 className="font-bold text-lg text-blue-500">{item.title}</h2>
                    <p className="text-justify">{item.message}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
