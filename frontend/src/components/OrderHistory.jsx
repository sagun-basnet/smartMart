import React, { useContext, useEffect, useState } from "react";
import { get, post } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import {
  PackageCheck,
  PackageOpen,
  Truck,
  X,
  Clock,
  Calendar,
  ShoppingBag,
} from "lucide-react";

const OrderHistory = ({ userId }) => {
  const { currentUser } = useContext(AuthContext);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("processing");

  // Fetch processing and delivered orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await get(`/api/get-orders-by-user/${currentUser?.id}`);
        const res1 = await get(`/api/get-sales-by-user/${currentUser?.id}`);

        // Format image strings into arrays
        const formatImages = (orders) =>
          orders?.map((order) => ({
            ...order,
            images: order.images ? order.images.split(",") : [],
          }));

        // const allOrders = formatImages(res);

        // Filter by status
        const processing = formatImages(res);
        const delivered = formatImages(res1);

        setProcessingOrders(processing);
        setDeliveredOrders(delivered);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch order history", err);
      }
    };

    fetchOrders();
  }, [userId]);

  const cancelOrder = async (orderId) => {
    try {
      await post(`/api/cancel-order/${orderId}`);
      setProcessingOrders((prev) =>
        prev.filter((order) => order.id !== orderId)
      );
      alert("Order cancelled");
    } catch (err) {
      console.error("Failed to cancel order", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Clock className="animate-spin text-blue-500 mb-2" size={32} />
          <p className="text-lg font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  const renderOrder = (order, cancel = false) => {
    const images = order.images || [];

    return (
      <div className="border p-4 rounded-md shadow-md bg-white space-y-3 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg flex items-center">
            <ShoppingBag className="mr-2 text-blue-500" size={18} />
            {order.title}
          </h2>
          <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            #{order.id}
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="mr-2" size={16} />
          <p className="text-sm">
            Order Date: {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex space-x-4">
          <p className="flex items-center text-gray-700">
            <ShoppingBag className="mr-1 text-gray-500" size={16} />
            Quantity: {order.order_quantity}
          </p>
          <p className="flex items-center">
            {order.status === "Processing" ? (
              <PackageOpen className="mr-1 text-amber-500" size={16} />
            ) : (
              <PackageCheck className="mr-1 text-green-500" size={16} />
            )}
            Status: {order.status}
          </p>
        </div>

        {images.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Product Images:</p>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5555${img}`}
                  alt="product"
                  className="w-16 h-16 object-cover border rounded"
                />
              ))}
            </div>
          </div>
        )}

        {cancel && (
          <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
            <button
              onClick={() => cancelOrder(order.id)}
              className="px-3 py-2 bg-red-500 text-white rounded flex items-center hover:bg-red-600 transition-colors"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>

            {/* Order Tracking Steps */}
            <div className="flex items-center space-x-2 text-sm mt-2 sm:mt-0">
              <Step label="Ordered" active={true} />
              <Step
                label="Packed"
                active={
                  order.tracking === "Packed" ||
                  order.tracking === "Shipped" ||
                  order.tracking === "Delivered"
                }
              />
              <Step
                label="Shipped"
                active={
                  order.tracking === "Shipped" || order.tracking === "Delivered"
                }
              />
              <Step label="Delivered" active={order.tracking === "Delivered"} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabClasses = (isActive) =>
    `flex-1 py-3 flex justify-center items-center font-medium text-center rounded-t-lg cursor-pointer transition-colors ${
      isActive
        ? "bg-white border-t border-l border-r border-gray-200 text-blue-600"
        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
    }`;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Clock className="mr-2 text-blue-600" />
          Order History
        </h1>

        {/* Tabs */}
        <div className="flex mb-1">
          <div
            className={tabClasses(activeTab === "processing")}
            onClick={() => setActiveTab("processing")}
          >
            <PackageOpen size={18} className="mr-2 text-amber-500" />
            Processing Orders
            {processingOrders.length > 0 && (
              <span className="ml-2 bg-amber-500 text-white rounded-full px-2 py-1 text-xs">
                {processingOrders.length}
              </span>
            )}
          </div>
          <div
            className={tabClasses(activeTab === "delivered")}
            onClick={() => setActiveTab("delivered")}
          >
            <Truck size={18} className="mr-2 text-green-500" />
            Received Orders
            {deliveredOrders.length > 0 && (
              <span className="ml-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                {deliveredOrders.length}
              </span>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-gray-200 rounded-b-lg p-6 shadow-sm">
          {activeTab === "processing" && (
            <div>
              {processingOrders.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {processingOrders.map((order) => renderOrder(order, true))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-12 text-gray-500">
                  <PackageOpen size={48} className="text-gray-400 mb-3" />
                  <p>No processing orders found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "delivered" && (
            <div>
              {deliveredOrders.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {deliveredOrders.map((order) => renderOrder(order))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-12 text-gray-500">
                  <PackageCheck size={48} className="text-gray-400 mb-3" />
                  <p>No delivered orders found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const Step = ({ label, active }) => {
  return (
    <div className="flex items-center space-x-1">
      <div
        className={`w-3 h-3 rounded-full ${
          active ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
      <span
        className={`text-xs ${active ? "text-green-600" : "text-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
};
export default OrderHistory;
