import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HiShoppingBag, 
  HiOutlineChevronRight,
  HiOutlineHome 
} from "react-icons/hi";
import { 
  BsWatch, 
  BsLaptop 
} from "react-icons/bs";
import { 
  GiClothes, 
  GiShoppingCart 
} from "react-icons/gi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Get active item based on current path
  const getActiveItem = () => {
    if (currentPath === "/shop") return "Shop";
    const category = currentPath.split("/shop/")[1];
    return category || "Shop";
  };

  const [active, setActive] = useState(getActiveItem());

  const categories = [
    { name: "Clothes", icon: <GiClothes size={20} /> },
    { name: "Watches", icon: <BsWatch size={20} /> },
    { name: "Electronics", icon: <BsLaptop size={20} /> },
    { name: "Groceries", icon: <MdOutlineLocalGroceryStore size={20} /> }
  ];

  return (
    <div className="h-full text-white bg-gradient-to-b from-[#0f172a] to-[#1e293b] w-64 flex flex-col gap-6 py-8 px-2">
      {/* Logo/Brand Area */}
      <div className="px-4 mb-4">
        <Link to="/" className="flex items-center gap-3">
          <GiShoppingCart className="text-3xl text-blue-400" />
          <span className="text-xl font-bold tracking-wider">ShopMart</span>
        </Link>
      </div>
      
      <div className="px-4">
        <div className="h-px bg-gray-700 mb-6"></div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full px-2">
        <Link to="/shop">
          <div
            className={`flex items-center gap-3 mb-2 px-4 py-3 rounded-lg cursor-pointer transition-all ${
              active === "Shop" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-gray-700/50"
            }`}
            onClick={() => setActive("Shop")}
          >
            <HiShoppingBag size={20} />
            <span className="font-medium">All Products</span>
          </div>
        </Link>
      </nav>

      {/* Category Section */}
      <div className="px-4 mt-2">
        <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Categories</h2>
        
        <nav className="flex flex-col gap-1 w-full">
          {categories.map((item) => (
            <Link to={`/shop/${item.name}`} key={item.name}>
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  active === item.name 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "hover:bg-gray-700/50"
                }`}
                onClick={() => setActive(item.name)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                <HiOutlineChevronRight 
                  className={`transition-all ${active === item.name ? "opacity-100" : "opacity-50"}`} 
                  size={16} 
                />
              </div>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Footer Info */}
      <div className="mt-auto px-6">
        <div className="bg-blue-900/30 rounded-xl p-4 text-sm">
          <p className="text-blue-200 font-medium mb-2">Need help?</p>
          <p className="text-gray-300 text-xs">Contact our support team for assistance with your shopping experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;