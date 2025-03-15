import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("Shop");

  return (
    <div className="h-[calc(100vh-5rem)] text-white bg-[#101828] w-[18rem] flex flex-col items-center gap-4 pt-8">
      {/* Shop Link */}
      <ul className="w-full text-center">
        <Link to="/shop">
          <li
            className={`w-full cursor-pointer px-4 py-2 ${
              active === "Shop" ? "bg-[rgba(256,256,256,0.3)]" : ""
            } hover:bg-[rgba(256,256,256,0.3)]`}
            onClick={() => setActive("Shop")}
          >
            Shop
          </li>
        </Link>
      </ul>

      {/* Category Heading */}
      <h2 className="text-2xl font-bold">Category</h2>

      {/* Category List */}
      <ul className="flex flex-col gap-2 w-full text-center">
        {["Clothes", "Watches", "Electronics", "Groceries"].map((item) => (
          <Link to={`/shop/${item}`}>
            <li
              key={item}
              className={`w-full cursor-pointer px-4 py-2 ${
                active === item ? "bg-[rgba(256,256,256,0.3)]" : ""
              } hover:bg-[rgba(256,256,256,0.3)]`}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
