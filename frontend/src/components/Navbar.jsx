import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/images/logo.png";

const Navbar = () => {
    return (
        <nav className="h-25 px-6 md:px-12 flex justify-between items-center w-full bg-white ">
            {/* Logo */}
            <div>
                <img src={logo1} alt="Logo" className="h-16 w-16" />
            </div>

            {/* Navigation Links - Hidden on mobile, flex on larger screens */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full">
                    Home
                </Link>

                <div className="relative">
                    <select className="bg-transparent border-none text-gray-700 focus:outline-none">
                        <option value="" disabled>Categories</option>
                        <option value="new-arrivals">New Arrivals</option>
                        <option value="best-sellers">Best Sellers</option>
                        <option value="featured-products">Featured Products</option>
                    </select>
                </div>

                <Link to="/shop" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full">
                    Shop
                </Link>
                <Link to="/blog" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full">
                    Blog
                </Link>
                <Link to="/contact" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full">
                    Contact
                </Link>
            </div>

            {/* Search Input */}
            <div className="hidden md:flex items-center">
                <input
                    type="search"
                    placeholder="Search..."
                    className="h-10 w-40 md:w-56 border-2 border-gray-300 rounded-full px-4 focus:outline-none"
                />
            </div>

            {/* User and Cart Icons */}
            <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center hover:underline">
                    <i className="fa-regular fa-user text-2xl mr-2"></i>
                    <p className="hidden md:block">Login/Register</p>
                </Link>

                <Link to="/cart" className="text-2xl text-gray-800">
                    <i className="fa-solid fa-bag-shopping"></i>
                </Link>

                {/* Dashboard Button */}
                <Link to="/dashboard">
                    <button className="bg-blue-600 text-white h-10 w-10 rounded-full text-sm hover:bg-blue-800 transition duration-300">
                        D
                    </button>
                </Link>
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
