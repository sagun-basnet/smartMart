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
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Calendar,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  Search,
} from "lucide-react";
import { get } from "../utils/api";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await get("/api/get-sales");
        // const data = await response.json();
        setSalesData(response);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const monthlySalesData = [
    { name: "Jan", revenue: 24000, orders: 120 },
    { name: "Feb", revenue: 18000, orders: 90 },
    { name: "Mar", revenue: 32000, orders: 160 },
    { name: "Apr", revenue: 27000, orders: 135 },
    { name: "May", revenue: 29000, orders: 145 },
    { name: "Jun", revenue: 35000, orders: 175 },
    { name: "Jul", revenue: 39000, orders: 195 },
    { name: "Aug", revenue: 30000, orders: 150 },
    { name: "Sep", revenue: 33000, orders: 165 },
    { name: "Oct", revenue: 38000, orders: 190 },
    { name: "Nov", revenue: 42000, orders: 210 },
    { name: "Dec", revenue: 47000, orders: 235 },
  ];

  const salesByCategoryData = [
    { name: "Electronics", value: 40 },
    { name: "Clothes", value: 30 },
    { name: "Watches", value: 15 },
    { name: "Groceries", value: 10 },
    { name: "Others", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const salesData1 = [
    {
      id: 1,
      orderID: "#ORD-7829",
      customer: "John Doe",
      date: "22 Apr 2025",
      items: 3,
      total: "Rs. 5,675",
      status: "Completed",
      payment: "Credit Card",
    },
    {
      id: 2,
      orderID: "#ORD-7830",
      customer: "Sara Wilson",
      date: "22 Apr 2025",
      items: 1,
      total: "Rs. 12,000",
      status: "Completed",
      payment: "PayPal",
    },
    {
      id: 3,
      orderID: "#ORD-7831",
      customer: "Michael Brown",
      date: "21 Apr 2025",
      items: 5,
      total: "Rs. 8,240",
      status: "Completed",
      payment: "UPI",
    },
    {
      id: 4,
      orderID: "#ORD-7832",
      customer: "Priya Sharma",
      date: "21 Apr 2025",
      items: 2,
      total: "Rs. 2,350",
      status: "Completed",
      payment: "Debit Card",
    },
    {
      id: 5,
      orderID: "#ORD-7833",
      customer: "Alex Wong",
      date: "20 Apr 2025",
      items: 4,
      total: "Rs. 7,890",
      status: "Completed",
      payment: "Credit Card",
    },
  ];

  const topSellingProducts = [
    { name: "Nike Shoe", sold: 124, revenue: "Rs. 1,488,000" },
    { name: "Smart Watch", sold: 98, revenue: "Rs. 784,000" },
    { name: "Wireless Earbuds", sold: 87, revenue: "Rs. 348,000" },
    { name: "Laptop Bag", sold: 76, revenue: "Rs. 228,000" },
    { name: "Smartphone", sold: 65, revenue: "Rs. 1,625,000" },
  ];

  return (
    <main className="p-6 bg-gray-100">
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Revenue & Orders Overview</h3>
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
            <LineChart
              data={monthlySalesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                name="Revenue (Rs.)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Sales by Category</h3>
            <button className="text-gray-500 hover:text-gray-700">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategoryData}
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
                {salesByCategoryData.map((entry, index) => (
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

      {/* Recent Sales Table */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Recent Sales</h3>
          <div className="flex">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search orders..."
                className="py-2 pl-8 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
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
              {salesData.map((sale) => (
                <tr key={sale.id}>
                  <td className="py-3 px-4 font-medium">{sale.sales_id}</td>
                  <td className="py-3 px-4">{sale.name}</td>
                  <td className="py-3 px-4">{sale.date}</td>
                  <td className="py-3 px-4">{sale.title}</td>
                  <td className="py-3 px-4 font-medium">
                    {/* {sale.price} */}
                    {sale.price *
                      (sale.order_quantity === 0 ? 1 : sale.order_quantity)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {sale.tracking}
                    </span>
                  </td>
                  <td className="py-3 px-4">ESEWA</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Top Selling Products</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Product Name
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Units Sold
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Revenue
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topSellingProducts.map((product, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 font-medium">{product.name}</td>
                  <td className="py-3 px-4">{product.sold}</td>
                  <td className="py-3 px-4 font-medium">{product.revenue}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${100 - index * 15}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
