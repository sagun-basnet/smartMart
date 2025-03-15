import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/images/logo.png";

const Navbar = () => {
    return (
        <nav className=" fixed top-0 z-10  h-25 px-6 md:px-12  mb-10 flex justify-between items-center w-full bg-white ">
            {/* Logo */}
            <div>
                <img src={logo1} alt="Logo" className="h-16 w-16" />
            </div>

            {/* Navigation Links - Hidden on mobile, flex on larger screens */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full font-semibold">
                    Home
                </Link>

                <div className="relative">
                    <select className="bg-transparent border-none text-gray-700 focus:outline-none font-semibold">
                        <option value="" disabled className="text-center">Categories</option>
                        <option value="new-arrivals " className="text-center">New Arrivals</option>
                        <option value="best-sellers" className="text-center">Best Sellers</option>
                        <option value="featured-products" className="text-center">Featured Products</option>
                    </select>
                </div>

                <Link to="/shop" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full font-semibold">
                    Shop
                </Link>
                <Link to="/blog" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full font-semibold">
                    Blog
                </Link>
                <Link to="/contact" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full font-semibold">
                    Contact
                </Link>
            </div>

            {/* Search Input */}
            <div className="hidden md:flex items-center p-2">
                <input
                    type="search"
                    placeholder="Search..."
                    className="h-10 w-40 md:w-70 border-2 border-gray-300 px-4 focus:outline-none "
                />
            </div>


            {/* User and Cart Icons */}
            <div className="flex items-center space-x-4 gap-4">
                <Link to="/Login" className="flex items-center bg-blue-950 p-2 px-4 rounded-4xl h-9  shadow-2xl hover:bg-blue-900">
                    <i className="fa-regular fa-user text-lg mr-2 text-white font-medium"></i>
                    <p className="hidden md:block text-white">Login</p>
                </Link>

                <Link to="/shoppingCart" className="justify-center items-center text-xl flex flex-col text-gray-700">
                    <i className="fa-solid fa-bag-shopping "></i>
                    <p className="text-[1.2rem] ">cart</p>
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
