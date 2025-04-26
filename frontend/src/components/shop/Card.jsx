import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineHeart, HiStar } from "react-icons/hi";
import { BiSolidCartAdd } from "react-icons/bi";

const Card = ({ data, viewMode = "grid" }) => {
  if (!data) return null;

  // Image handling
  const getImageUrl = () => {
    if (!data.images) return "/api/placeholder/400/320";
    const str = String(data.images);
    const beforeComma = str.slice(0, str.indexOf(","));
    return `http://localhost:5555${beforeComma}`;
  };

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    if (!data.price || !data.discount) return data.price;
    return (data.price - data.price * (parseInt(data.discount) / 100)).toFixed(
      0
    );
  };

  // Generate random rating for demo purposes
  const rating = (Math.random() * 2 + 3).toFixed(1);

  if (viewMode === "list") {
    return (
      <Link to={`/products/${data.pid}`} className="block">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex border border-gray-100">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={getImageUrl()}
              alt={data.title}
            />
          </div>

          <div className="flex flex-col p-6 flex-1 justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                  {data.title}
                </h2>
                <div className="flex items-center gap-1 text-amber-500">
                  <HiStar />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {data.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {data.discount && parseInt(data.discount) > 0 && (
                  <span className="text-gray-500 line-through text-sm">
                    Rs. {data.price}
                  </span>
                )}
                <span className="font-bold text-blue-600 text-xl">
                  Rs. {calculateDiscountedPrice()}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                  <HiOutlineHeart size={20} />
                </button>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <BiSolidCartAdd size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${data.pid}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all h-full border border-gray-100 group overflow-hidden">
        {/* Image container with overlay actions */}
        <div className="relative h-64 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={getImageUrl()}
            alt={data.title}
          />

          {/* Discount badge if applicable */}
          {data.discount && parseInt(data.discount) > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {data.discount}% OFF
            </div>
          )}

          {/* Quick action buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
              <HiOutlineHeart size={20} />
            </button>
            <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <HiOutlineShoppingCart size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and rating */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {data.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {data.description
              ? `${data.description.slice(0, 100)}...`
              : "No description available"}
          </p>

          {/* Pricing and add to cart */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              {data.discount && parseInt(data.discount) > 0 && (
                <span className="text-gray-500 line-through text-sm">
                  Rs. {data.price}
                </span>
              )}
              <span className="font-bold text-blue-600 text-lg">
                Rs. {calculateDiscountedPrice()}
              </span>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
              <BiSolidCartAdd size={24} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
