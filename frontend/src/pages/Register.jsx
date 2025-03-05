import React, { useState } from "react";
import bgImage from "../assets/images/registerBg.jpg";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role_id: 2,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted ", formData);
    const res = await post("/api/register", formData);
    console.log(res);

    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
    toast.success(res.message);
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-4xl h-auto md:h-[70vh] flex flex-col md:flex-row shadow-lg">
        {/* Left Side - Bg Image Section */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-full flex flex-col items-center justify-center p-6">
          <div
            style={{ backgroundImage: `url(${bgImage})` }}
            className="absolute inset-0 bg-cover bg-center opacity-40 rounded-l-lg"
          ></div>
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold">Sign Up Page</h1>
            <p className="text-gray-400 text-md md:text-lg">
              Start your journey with Us
            </p>
          </div>
          <div className="relative z-10 mt-4 flex flex-col items-center">
            <p className="text-sm md:text-base">Already have an account?</p>
            <Link to={"/login"}>
              <button className="w-full md:w-32 h-10 border-2 border-[#4bae30] text-[#4bae30] flex items-center justify-center gap-1 mt-2 px-4 py-2 hover:bg-[#4bae30] hover:text-[#fbfeeb] rounded-md cursor-pointer">
                Sign In <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
        {/* Right Side - Form Section */}
        <div className="my-bg w-full md:w-1/2 h-auto md:h-full p-6 flex items-center rounded-r-lg">
          <form action="" onSubmit={handleSubmit} className="w-full grid gap-4">
            <h2 className="text-center text-xl md:text-2xl font-bold">
              Sign Up
            </h2>

            <div className="flex flex-col">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="h-10 w-32 bg-[#4bae30] text-[fbfeeb] rounded-md hover:text-[#4bae30] hover:bg-transparent hover:border-2 border-[#4bae30] cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
