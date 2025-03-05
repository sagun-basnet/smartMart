import { Link } from "react-router-dom";
import { HomeIcon, ShoppingBagIcon, PlusCircleIcon } from "@heroicons/react/outline";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white h-full p-5">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <Link to="/" className="flex items-center mb-4 hover:text-gray-400">
                    <HomeIcon className="w-5 h-5 mr-2" />
                    Dashboard
                </Link>
                <Link to="/products" className="flex items-center mb-4 hover:text-gray-400">
                    <ShoppingBagIcon className="w-5 h-5 mr-2" />
                    Products
                </Link>
                <Link to="/add-product" className="flex items-center hover:text-gray-400">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Add Product
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
