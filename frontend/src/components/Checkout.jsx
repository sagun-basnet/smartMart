import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { IoMdArrowRoundBack, IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  FaCreditCard,
  FaLock,
  FaShippingFast,
  FaMoneyBillWave,
  FaUserCircle,
  FaReceipt,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity, MdLocationOn } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { SiEsea } from "react-icons/si";
// import LoadingSpinner from "../components/LoadingSpinner"; // Assuming you have this component

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    items,
    fromSingleProduct,
    subtotal,
    shipping,
    discount,
    total: cartTotal,
  } = location.state || {};
  const { currentUser } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [esewa, setEsewa] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: currentUser?.address || "",
    city: currentUser?.city || "",
    state: "",
    zipCode: "",
  });
  const [orderStep, setOrderStep] = useState(1);

  const productIds = items?.map((item) => item.pid);
  const quantities = items?.map((item) => item.quantity);

  // Encode both arrays as base64 strings
  const encodedProductIds = productIds ? btoa(JSON.stringify(productIds)) : "";
  const encodedQuantities = quantities ? btoa(JSON.stringify(quantities)) : "";

  const loadEsewa = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5555/api/verifyEsewa/${parseInt(totalPrice)}`
      );
      setEsewa(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading eSewa:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (items?.length && totalPrice > 0) {
      loadEsewa();
    }
  }, [totalPrice, items]);

  useEffect(() => {
    if (items && items.length > 0) {
      const total = items.reduce((sum, item) => {
        return (
          sum +
          parseInt(item.price) *
            (1 - item.discount / 100) *
            parseInt(item.quantity)
        );
      }, 0);
      setTotalPrice(total);
    }
  }, [items]);

  function formatNumberCustom(number) {
    if (!number) return "";

    let numStr = number.toString().split("").reverse().join("");
    let firstPart = numStr.slice(0, 3);
    let restPart = numStr.slice(3);
    let groupedRest = restPart.match(/.{1,2}/g) || [];

    let formattedNumber =
      firstPart + (groupedRest.length ? "," + groupedRest.join(",") : "");

    return formattedNumber.split("").reverse().join("");
  }

  const discountedPrice = (price, discount) =>
    (price * (1 - discount / 100)).toFixed(2);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAddress = () => {
    const { street, city, state, zipCode } = deliveryAddress;
    if (!street || !city || !state || !zipCode) return false;
    return true;
  };

  const goToNextStep = () => {
    if (orderStep === 1 && !validateAddress()) {
      alert("Please fill all address fields");
      return;
    }
    setOrderStep(orderStep + 1);
  };

  const goToPreviousStep = () => {
    setOrderStep(orderStep - 1);
  };

  // Calculate shipping cost (if not provided from cart)
  const shippingCost = shipping || (totalPrice > 1000 ? 0 : 100);

  // Calculate total with shipping
  const finalTotal = totalPrice + shippingCost - (discount || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 flex items-center">
          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition mr-4"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack className="text-2xl mr-2" />
            <span className="font-medium">Back to cart</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  orderStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`ml-2 font-medium ${
                  orderStep >= 1 ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Shipping
              </div>
            </div>
            <div
              className={`w-20 h-1 mx-3 ${
                orderStep >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  orderStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div
                className={`ml-2 font-medium ${
                  orderStep >= 2 ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Payment
              </div>
            </div>
            <div
              className={`w-20 h-1 mx-3 ${
                orderStep >= 3 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  orderStep >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
              <div
                className={`ml-2 font-medium ${
                  orderStep >= 3 ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Confirmation
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Section */}
          <div className="lg:w-8/12">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {orderStep === 1 && (
                <div className="shipping-address">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <MdLocationOn className="mr-2 text-blue-600" />
                    Shipping Address
                  </h2>

                  <div className="flex items-center mb-6">
                    <div className="rounded-full w-10 h-10 grid place-items-center text-xl font-bold bg-blue-500 text-white">
                      {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="ml-3 capitalize font-medium text-gray-800">
                      {currentUser?.name || "User"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-gray-700 mb-2 font-medium">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={deliveryAddress.street}
                        onChange={handleAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        State/Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={deliveryAddress.state}
                        onChange={handleAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={deliveryAddress.zipCode}
                        onChange={handleAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ZIP Code"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone Number"
                        defaultValue={currentUser?.phone || ""}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveAddress"
                        className="mr-2"
                      />
                      <label htmlFor="saveAddress" className="text-gray-700">
                        Save address for future orders
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {orderStep === 2 && (
                <div className="payment-method">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaCreditCard className="mr-2 text-blue-600" />
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        paymentMethod === "esewa"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => setPaymentMethod("esewa")}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            paymentMethod === "esewa"
                              ? "border-blue-500"
                              : "border-gray-400"
                          }`}
                        >
                          {paymentMethod === "esewa" && (
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <SiEsea className="text-2xl text-green-600 mr-2" />
                          <span className="font-medium">eSewa</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        paymentMethod === "cod"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            paymentMethod === "cod"
                              ? "border-blue-500"
                              : "border-gray-400"
                          }`}
                        >
                          {paymentMethod === "cod" && (
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <BsCashCoin className="text-2xl text-yellow-600 mr-2" />
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentMethod === "esewa" && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                      <div className="flex items-center mb-4">
                        {/* <SiEsea className="text-3xl text-green-600 mr-3" /> */}
                        <div>
                          <h3 className="font-medium">Pay with eSewa</h3>
                          <p className="text-sm text-gray-600">
                            You'll be redirected to eSewa to complete your
                            payment
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FaLock className="mr-2 text-gray-500" />
                        Secure payment processed by eSewa
                      </div>

                      {isLoading ? (
                        <div className="flex justify-center p-4">
                          Loading......
                        </div>
                      ) : (
                        <form
                          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                          method="POST"
                          id="esewaForm"
                        >
                          <input
                            hidden
                            type="text"
                            name="amount"
                            value={parseInt(totalPrice)}
                          />
                          <input
                            hidden
                            type="text"
                            name="tax_amount"
                            value="0"
                          />
                          <input
                            hidden
                            type="text"
                            name="total_amount"
                            value={parseInt(totalPrice)}
                          />
                          <input
                            hidden
                            type="text"
                            name="transaction_uuid"
                            value={esewa?.uuid || ""}
                          />
                          <input
                            hidden
                            type="text"
                            name="product_code"
                            value="EPAYTEST"
                          />
                          <input
                            hidden
                            type="text"
                            name="product_service_charge"
                            value="0"
                          />
                          <input
                            hidden
                            type="text"
                            name="product_delivery_charge"
                            value="0"
                          />
                          <input
                            hidden
                            type="text"
                            name="success_url"
                            value={`http://localhost:5555/api/success/${encodedProductIds}/${encodedQuantities}/${currentUser.id}`}
                          />
                          <input
                            hidden
                            type="text"
                            name="failure_url"
                            value="http://localhost:5173"
                          />
                          <input
                            hidden
                            type="text"
                            name="signed_field_names"
                            value="total_amount,transaction_uuid,product_code"
                          />
                          <input
                            hidden
                            type="text"
                            name="signature"
                            value={esewa?.signature || ""}
                          />
                        </form>
                      )}
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-4">
                        <FaMoneyBillWave className="text-3xl text-yellow-600 mr-3" />
                        <div>
                          <h3 className="font-medium">Cash on Delivery</h3>
                          <p className="text-sm text-gray-600">
                            Pay with cash when your order is delivered
                          </p>
                        </div>
                      </div>

                      <div className="text-sm text-gray-700">
                        <p className="mb-2 flex items-center">
                          <TbTruckDelivery className="mr-2" />
                          Delivery within 3-5 business days
                        </p>
                        <p className="flex items-center">
                          <MdSecurity className="mr-2" />
                          Safe and contactless delivery
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {orderStep === 3 && (
                <div className="order-confirmation">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                      <IoMdCheckmarkCircleOutline className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order Summary
                    </h2>
                    <p className="text-gray-600">
                      Review your order before finalizing
                    </p>
                  </div>

                  <div className="border-t border-b py-4 mb-4">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <MdLocationOn className="mr-2 text-blue-600" />
                      Shipping Address
                    </h3>
                    <div className="text-gray-700">
                      <p className="capitalize">{currentUser?.name}</p>
                      <p>{deliveryAddress.street}</p>
                      <p>
                        {deliveryAddress.city}, {deliveryAddress.state}{" "}
                        {deliveryAddress.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="border-b py-4 mb-4">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <FaShippingFast className="mr-2 text-blue-600" />
                      Delivery Method
                    </h3>
                    <p className="text-gray-700">
                      Standard Delivery (3-5 business days)
                    </p>
                  </div>

                  <div className="border-b py-4 mb-4">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <FaCreditCard className="mr-2 text-blue-600" />
                      Payment Method
                    </h3>
                    <div className="flex items-center">
                      {paymentMethod === "esewa" ? (
                        <>
                          <SiEsea className="text-xl text-green-600 mr-2" />
                          <span>eSewa Payment</span>
                        </>
                      ) : (
                        <>
                          <BsCashCoin className="text-xl text-yellow-600 mr-2" />
                          <span>Cash on Delivery</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {orderStep > 1 ? (
                  <button
                    onClick={goToPreviousStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}

                {orderStep < 3 ? (
                  <button
                    onClick={goToNextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Continue
                  </button>
                ) : paymentMethod === "esewa" ? (
                  <button
                    onClick={() =>
                      document.getElementById("esewaForm").submit()
                    }
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
                    disabled={isLoading}
                  >
                    {/* <SiEsea className="mr-2" /> */}
                    Pay with eSewa
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      alert(
                        "Your order has been placed! You will pay on delivery."
                      );
                      navigate("/order-confirmation", {
                        state: {
                          orderId: Math.floor(Math.random() * 1000000),
                          items,
                          totalPrice: finalTotal,
                          paymentMethod,
                        },
                      });
                    }}
                    className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition flex items-center"
                  >
                    <BsCashCoin className="mr-2" />
                    Place Order (COD)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-4/12">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b flex items-center">
                <FaReceipt className="mr-2 text-blue-600" />
                Order Summary
              </h2>

              <div className="mb-4 max-h-60 overflow-y-auto">
                {items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                  >
                    <div className="w-16 h-16 rounded-md border border-gray-200 overflow-hidden flex-shrink-0">
                      {item.images?.[0] && (
                        <img
                          className="w-full h-full object-cover"
                          src={`http://localhost:5555${item.images[0]}`}
                          alt={item.title}
                        />
                      )}
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Qty: {item.quantity}</span>
                        <span
                          className={
                            item.discount > 0
                              ? "line-through text-gray-400"
                              : ""
                          }
                        >
                          Rs. {formatNumberCustom(parseInt(item.price))}
                        </span>
                      </div>
                      {item.discount > 0 && (
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-green-600">
                            {item.discount}% off
                          </span>
                          <span className="font-medium">
                            Rs.{" "}
                            {formatNumberCustom(
                              parseInt(
                                discountedPrice(item.price, item.discount)
                              )
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {formatNumberCustom(parseInt(totalPrice))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `Rs. ${formatNumberCustom(shippingCost)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- Rs. {formatNumberCustom(parseInt(discount))}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>Rs. {formatNumberCustom(parseInt(finalTotal))}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaShippingFast className="mr-2 text-blue-600" />
                  Free shipping on orders above Rs. 1,000
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaLock className="mr-2 text-blue-600" />
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
