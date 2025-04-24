import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Truck,
  Package,
  Calendar,
  AlertCircle,
  Filter,
  Download,
  Search,
  Check,
  X,
  Edit,
  ChevronDown,
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  Send,
  XCircle,
} from "lucide-react";
import { get, post } from "../utils/api";
import { toast } from "react-toastify";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await get("/api/get-orders");
      console.log("Fetched orders:", response);

      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Optimistically update the UI
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, tracking: newStatus } : order
        )
      );

      if (selectedOrder?.order_id === orderId) {
        setSelectedOrder((prev) => ({
          ...prev,
          tracking: newStatus,
        }));
      }

      // Then make the API call
      await post(`/api/update-order/${orderId}`, {
        status: newStatus,
      });
      setStatus(status + 1);

      toast.success(`Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
      // Revert on error
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, tracking: selectedOrder.tracking }
            : order
        )
      );

      toast.error(`Failed to update order ${orderId}: ${error.message}`);
    }
  };

  const orderStatusData = [
    { name: "Ordered", value: 35 },
    { name: "Packed", value: 20 },
    { name: "Shipped", value: 15 },
    { name: "Out for Delivery", value: 10 },
    { name: "Delivered", value: 15 },
    { name: "Cancelled", value: 5 },
  ];

  const orderTrendData = [
    { name: "Jan", orders: 65, returns: 5 },
    { name: "Feb", orders: 78, returns: 8 },
    { name: "Mar", orders: 95, returns: 7 },
    { name: "Apr", orders: 130, returns: 10 },
    { name: "May", orders: 114, returns: 9 },
    { name: "Jun", orders: 142, returns: 12 },
    { name: "Jul", orders: 160, returns: 14 },
    { name: "Aug", orders: 128, returns: 11 },
    { name: "Sep", orders: 145, returns: 13 },
    { name: "Oct", orders: 178, returns: 15 },
    { name: "Nov", orders: 196, returns: 18 },
    { name: "Dec", orders: 220, returns: 21 },
  ];

  const COLORS = [
    "#4f46e5",
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#22c55e",
    "#ef4444",
  ];

  const STATUS_COLORS = {
    Ordered: "bg-indigo-100 text-indigo-800",
    Packed: "bg-emerald-100 text-emerald-800",
    Shipped: "bg-blue-100 text-blue-800",
    "Out for Delivery": "bg-amber-100 text-amber-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const STATUS_ICONS = {
    Ordered: <ShoppingBag className="h-4 w-4 mr-1" />,
    Packed: <Package className="h-4 w-4 mr-1" />,
    Shipped: <Send className="h-4 w-4 mr-1" />,
    "Out for Delivery": <Truck className="h-4 w-4 mr-1" />,
    Delivered: <CheckCircle2 className="h-4 w-4 mr-1" />,
    Cancelled: <XCircle className="h-4 w-4 mr-1" />,
  };

  const orderStatusSteps = [
    "Ordered",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <main className="p-6 bg-gray-100">
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Order Trends</h3>
            <div className="flex items-center text-sm">
              <button className="mr-2 text-gray-500 hover:text-gray-700">
                <Filter className="h-4 w-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={orderTrendData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
              <Bar dataKey="returns" fill="#ef4444" name="Returns" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Orders by Status</h3>
            <button className="text-gray-500 hover:text-gray-700">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {orderStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Management */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Order Management</h3>
          <div className="flex">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search orders..."
                className="py-2 pl-8 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Status filter dropdown */}
            <div className="relative mr-4">
              <button
                className="bg-white border border-gray-300 py-2 px-4 rounded-lg flex items-center text-gray-700"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                Filter: {filterStatus} <ChevronDown className="ml-2 h-4 w-4" />
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg">
                  <ul className="py-1">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFilterStatus("All");
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      All
                    </li>
                    {Object.keys(STATUS_COLORS).map((status) => (
                      <li
                        key={status}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => {
                          setFilterStatus(status);
                          setIsStatusDropdownOpen(false);
                        }}
                      >
                        {STATUS_ICONS[status]}
                        {status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Customer
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Items
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Quantity
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Total
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Status
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Payment
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, sn) => (
                <tr key={order.id}>
                  <td className="py-3 px-4 font-medium">{sn + 1}</td>
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.title}</td>
                  <td className="py-3 px-4">{order.order_quantity}</td>
                  <td className="py-3 px-4 font-medium">
                    {order.price *
                      (order.order_quantity === 0 ? 1 : order.order_quantity)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 ${
                        STATUS_COLORS[order.tracking]
                      } rounded-full text-xs flex items-center inline-flex`}
                    >
                      {STATUS_ICONS[order.tracking]}
                      {order.tracking}
                    </span>
                  </td>
                  <td className="py-3 px-4">Esewa</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-6 of 1,245 orders</p>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Details & Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Order Details: {selectedOrder.order_id}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <p>
                    <span className="text-gray-500">Name:</span>{" "}
                    {selectedOrder.name}
                  </p>
                  <p>
                    <span className="text-gray-500">Phone:</span>{" "}
                    {selectedOrder.phone}
                  </p>
                  <p>
                    <span className="text-gray-500">Address:</span>{" "}
                    {selectedOrder.address}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Order Information</h4>
                  <p>
                    <span className="text-gray-500">Date:</span>{" "}
                    {selectedOrder.date}
                  </p>
                  <p>
                    <span className="text-gray-500">Payment Method:</span> Esewa
                  </p>
                  <p>
                    <span className="text-gray-500">Total Amount:</span>{" "}
                    {selectedOrder.price *
                      (selectedOrder.order_quantity === 0
                        ? 1
                        : selectedOrder.order_quantity)}
                  </p>
                </div>
              </div>

              {/* Order Tracking UI */}
              <div className="mb-6">
                <h4 className="font-medium mb-4">Order Status Tracking</h4>

                <div className="relative">
                  {/* Progress Bar */}
                  <div className="h-1 bg-gray-200 absolute top-5 left-0 right-0 z-0">
                    <div
                      className="h-1 bg-blue-600 absolute top-0 left-0"
                      style={{
                        width: `${
                          selectedOrder.tracking === "Cancelled"
                            ? "0%"
                            : `${
                                ((orderStatusSteps.indexOf(
                                  selectedOrder.tracking
                                ) +
                                  1) /
                                  orderStatusSteps.length) *
                                100
                              }%`
                        }`,
                      }}
                    ></div>
                  </div>

                  {/* Status Steps */}
                  <div className="flex justify-between relative z-10">
                    {orderStatusSteps.map((status, index) => {
                      const isCompleted =
                        orderStatusSteps.indexOf(selectedOrder.tracking) >=
                        index;
                      const isCurrent = selectedOrder.tracking === status;

                      return (
                        <div
                          key={status}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${
                isCompleted
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }
              ${isCurrent ? "ring-4 ring-blue-100" : ""}`}
                          >
                            {STATUS_ICONS[status]}
                          </div>
                          <p className="mt-2 text-sm font-medium text-center">
                            {status}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedOrder.tracking === "Cancelled" && (
                  <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 mr-2" />
                      <p className="font-medium">
                        This order has been cancelled
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Update Status Section */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Update Order Status</h4>

                <div className="flex flex-wrap gap-2">
                  {Object.keys(STATUS_COLORS).map((status) => (
                    <button
                      key={status}
                      className={`px-3 py-1.5 rounded-lg flex items-center 
        ${
          selectedOrder.tracking === status
            ? "bg-blue-100 text-blue-800 border border-blue-300"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
                      onClick={() => {
                        // Update local state immediately
                        setSelectedOrder((prev) => ({
                          ...prev,
                          tracking: status,
                        }));
                        // Then call the API
                        updateOrderStatus(selectedOrder.order_id, status);
                      }}
                      disabled={selectedOrder.tracking === status}
                    >
                      {STATUS_ICONS[status]}
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Items (just placeholder) */}
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Product
                      </th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Price
                      </th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Sample items - in a real app, these would come from your data */}
                    <tr>
                      <td className="py-2 px-3">{selectedOrder.title}</td>
                      <td className="py-2 px-3">
                        {selectedOrder.order_quantity}
                      </td>
                      <td className="py-2 px-3">Rs. {selectedOrder.price}</td>
                      <td className="py-2 px-3">
                        Rs.{" "}
                        {selectedOrder.price *
                          (selectedOrder.order_quantity === 0
                            ? 1
                            : selectedOrder.order_quantity)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                className="mr-2 px-4 py-2 border border-gray-300 rounded-lg"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
