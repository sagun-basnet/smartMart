import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { IoPricetagOutline } from "react-icons/io5";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBank } from "react-icons/bs";

const D_Sidebar = () => {
  const baseStyle =
    "flex items-center mb-4 hover:text-gray-400 transition-colors duration-200";
  const activeStyle = "text-blue-400 font-semibold";

  return (
    <div className="w-64 bg-gray-800 fixed text-white h-full p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/product"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <ShoppingBagIcon className="w-5 h-5 mr-2" />
          Products
        </NavLink>

        <NavLink
          to="/dashboard/add-product"
          end
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Add Product
        </NavLink>

        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <IoPricetagOutline className="w-5 h-5 mr-2" />
          Sales
        </NavLink>

        <NavLink
          to="/dashboard/order"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <MdShoppingCartCheckout className="w-5 h-5 mr-2" />
          Order
        </NavLink>

        <NavLink
          to="/dashboard/transaction"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <BsBank className="w-5 h-5 mr-2" />
          Transaction
        </NavLink>
      </nav>
    </div>
  );
};

export default D_Sidebar;
