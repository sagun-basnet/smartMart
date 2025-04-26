import React, { useContext, useState } from "react";
import image from "../assets/images/loginBg.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { post } from "../utils/api";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    // const res = await post("/api/login", formData);
    const res = await login(formData);
    console.log(res);
    console.log("Login Response: ", res);

    setFormData({
      email: "",
      password: "",
    });
    toast.success(res.message);
    if (res.others.role_id === 1) {
      toast.success("Welcome Admin");
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-4xl h-auto md:h-[70vh] flex flex-col md:flex-row shadow-lg">
        {/* Right Side - Form Section */}
        <div className=" w-full md:w-1/2 h-auto md:h-full p-6 flex items-center rounded-l-lg">
          <form onSubmit={handleSubmit} action="" className="w-full grid gap-4">
            <h2 className="text-center text-xl md:text-2xl font-bold">
              Sign In
            </h2>
            <div className="flex flex-col">
              <label htmlFor="email">Email:</label>
              <input
                value={formData.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password:</label>
              <input
                value={formData.password}
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <Link to={"/forget-password"}>
              <span>Forget password?</span>
            </Link>
            <div className="flex justify-center">
              <button
                type="submit"
                className="h-10 w-32 bg-[#4bae30] text-[fbfeeb] rounded-md hover:text-[#4bae30] hover:bg-transparent hover:border-2 border-[#4bae30] cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        {/* Left Side - Bg Image Section */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-full flex flex-col items-center justify-center p-6 bg-black opacity-90 text-white">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="absolute inset-0 bg-cover bg-center rounded-r-lg"
          ></div>
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold">Sign In Page</h1>
            <p className="text-gray-400 text-md md:text-lg">
              Start your journey with Us
            </p>
          </div>
          <div className="relative z-10 mt-4 flex flex-col items-center">
            <p className="text-sm md:text-base">Don't have an account?</p>
            <Link to={"/register"}>
              <button className="w-full md:w-32 h-10 border-2 border-[#4bae30] text-[#4bae30] flex items-center justify-center gap-1 mt-2 px-4 py-2 hover:bg-[#4bae30] hover:text-[#fbfeeb] rounded-md cursor-pointer">
                <FaArrowLeft /> Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
