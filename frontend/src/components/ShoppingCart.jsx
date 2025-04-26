import React, { useState } from "react";
import { UseCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaShoppingCart,
  FaTrash,
  FaCheckSquare,
  FaRegSquare,
  FaMinus,
  FaPlus,
  FaChevronRight,
  FaGift,
  FaTags,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { TbDiscount } from "react-icons/tb";

const ShoppingCart = () => {
  const { cart, dispatch } = UseCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const navigate = useNavigate();

  // Handle the checkbox for selecting all items
  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]); // Unselect all
    } else {
      setSelectedItems(cart.map((item) => item.id)); // Select all
    }
  };

  // Handle individual item selection
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle item removal
  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select items to remove");
      return;
    }
    dispatch({ type: "REMOVE_SELECTED", payload: selectedItems });
    toast.success("Selected items removed from cart");
    setSelectedItems([]); // Clear selected items
  };

  // Handle quantity change
  const handleQuantityChange = (id, type) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, type } });
  };

  // Calculate subtotal for selected items only
  const subtotal = cart.reduce((acc, item) => {
    if (selectedItems.includes(item.id)) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  // Calculate total quantity for selected items only
  const totalQuantity = cart.reduce((acc, item) => {
    if (selectedItems.includes(item.id)) {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  // Apply coupon discount (mock function)
  const applyCoupon = () => {
    if (couponCode.trim() === "") {
      toast.error("Please enter a coupon code");
      return;
    }

    if (couponCode.toLowerCase() === "save10") {
      toast.success("Coupon applied successfully!");
      setShowCouponInput(false);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  // Calculate shipping cost
  const shippingCost = subtotal > 0 ? (subtotal > 1000 ? 0 : 100) : 0;

  // Apply discount if valid coupon
  const discount = couponCode.toLowerCase() === "save10" ? subtotal * 0.1 : 0;

  // Calculate final total
  const total = subtotal + shippingCost - discount;

  // Go back to shopping
  const continueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaShoppingCart className="mr-3 text-blue-600" />
            Your Shopping Cart
          </h1>
          <button
            onClick={continueShopping}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <BiArrowBack className="mr-2" />
            Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 text-6xl mb-4 flex justify-center">
              <FaShoppingCart />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={continueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="lg:w-8/12">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b p-4 flex justify-between items-center bg-gray-50">
                  <div className="flex items-center">
                    <button
                      onClick={handleSelectAll}
                      className="flex items-center text-gray-700 hover:text-blue-600 transition"
                    >
                      {selectedItems.length === cart.length &&
                      cart.length > 0 ? (
                        <FaCheckSquare className="mr-2 text-blue-600" />
                      ) : (
                        <FaRegSquare className="mr-2" />
                      )}
                      <span className="font-medium">Select All</span>
                    </button>
                  </div>
                  <button
                    onClick={handleRemoveSelected}
                    className={`flex items-center ${
                      selectedItems.length === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-500 hover:text-red-700"
                    } transition`}
                    disabled={selectedItems.length === 0}
                  >
                    <FaTrash className="mr-2" />
                    <span className="font-medium">Delete Selected</span>
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex items-center gap-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() => handleSelectItem(item.id)}
                          className="mr-3"
                        >
                          {selectedItems.includes(item.id) ? (
                            <FaCheckSquare className="text-blue-600 text-xl" />
                          ) : (
                            <FaRegSquare className="text-gray-400 text-xl" />
                          )}
                        </button>
                      </div>

                      <div className="w-20 h-20 border rounded-md overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {item.description.slice(0, 10) + "..."}
                        </p>
                      </div>

                      <div className="text-lg font-medium text-green-600 mx-4 w-24 text-right">
                        Rs. {item.price}
                      </div>

                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, "decrease")
                          }
                          className={`p-2 ${
                            item.quantity <= 1
                              ? "bg-gray-100 text-gray-400"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          } transition`}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="px-4 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, "increase")
                          }
                          className="p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      <div className="text-lg font-semibold text-gray-800 w-28 text-right">
                        Rs. {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-4/12">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Items ({totalQuantity})
                    </span>
                    <span className="font-medium">Rs. {subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center">
                      <MdLocalShipping className="mr-2 text-lg" />
                      Shipping
                    </span>
                    <span className="font-medium">
                      {shippingCost === 0 ? "Free" : `Rs. ${shippingCost}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        <TbDiscount className="mr-2 text-lg" />
                        Discount (10%)
                      </span>
                      <span className="font-medium">
                        - Rs. {discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {!showCouponInput ? (
                    <button
                      onClick={() => setShowCouponInput(true)}
                      className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium transition"
                    >
                      <FaTags className="mr-2" />
                      Apply Coupon Code
                    </button>
                  ) : (
                    <div className="flex mb-4 gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2 items-center">
                    <span className="text-gray-800 font-semibold">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      Rs. {total.toFixed(2)}
                    </span>
                  </div>
                  {subtotal > 1000 && (
                    <div className="text-green-600 text-sm flex items-center mb-4">
                      <FaGift className="mr-2" />
                      Free shipping on orders above Rs. 1000
                    </div>
                  )}
                </div>

                <button
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    if (selectedItems.length === 0) {
                      toast.error(
                        "Please select at least one item to proceed to checkout."
                      );
                      return;
                    }
                    const selectedCartItems = cart.filter((item) =>
                      selectedItems.includes(item.id)
                    );
                    navigate("/product/checkout", {
                      state: {
                        items: selectedCartItems,
                        fromSingleProduct: false,
                        subtotal,
                        shipping: shippingCost,
                        discount,
                        total,
                      },
                    });
                  }}
                  className={`w-full mt-4 py-3 px-6 flex items-center justify-center rounded-lg font-medium transition ${
                    selectedItems.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Proceed to Checkout
                  <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
