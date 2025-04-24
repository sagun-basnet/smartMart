import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
  ShoppingBag,
  DollarSign,
  Users,
  Package,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { get } from "../../utils/api";
function Dashboard() {
  const [order, setOrder] = useState(0);
  const [product, setProduct] = useState(0);
  const [user, setUser] = useState(0);
  const [sales, setSales] = useState(0);
  const [amt, setAmt] = useState(0);
  const [products, setProducts] = useState([]);

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
    { name: "Jul", sales: 3490 },
    { name: "Aug", sales: 4000 },
    { name: "Sep", sales: 3200 },
    { name: "Oct", sales: 2800 },
    { name: "Nov", sales: 3300 },
    { name: "Dec", sales: 5000 },
  ];

  const categoryData = [
    { name: "Electronics", value: 40 },
    { name: "Clothes", value: 30 },
    { name: "Watches", value: 20 },
    { name: "Groceries", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const fetchOrders = async () => {
    const res = await get("/api/get-orders");
    console.log(res.length, "orders");
    setOrder(res.length);
    const res1 = await get("/api/get-products");
    console.log(res1, "products");

    const formattedProducts = res1.map((product) => ({
      ...product,
      images: product.images?.split(",") || [], // convert comma-separated string to array
    }));
    console.log(formattedProducts, "formatted products");

    setProducts(formattedProducts);
    setProduct(res1.length);
    const res2 = await get("/api/get-all-user");
    console.log(res2.length, "users");
    setUser(res2.length);
    const res3 = await get("/api/get-sales");
    console.log(res3.length, "sales");
    setSales(res3.length);
    const res4 = await get("/api/total");
    console.log(res4, "total amount");
    setAmt(res4.total_amount);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <main className="p-6 bg-gray-100">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Product Sales</p>
            <div className="flex items-center">
              <p className="text-xl font-bold mr-2">{sales}</p>
              <div className="flex items-center text-green-500 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>12%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Transaction Amount</p>
            <div className="flex items-center">
              <p className="text-xl font-bold mr-2">{amt}</p>
              <div className="flex items-center text-green-500 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <Package className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <div className="flex items-center">
              <p className="text-xl font-bold mr-2">{product}</p>
              <div className="flex items-center text-red-500 text-xs">
                <ArrowDown className="h-3 w-3 mr-1" />
                <span>3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 mr-4">
            <Users className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Customers</p>
            <div className="flex items-center">
              <p className="text-xl font-bold mr-2">{user}</p>
              <div className="flex items-center text-green-500 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>18%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Sales Overview</h3>
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
              data={salesData}
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
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Product Categories</h3>
            <button className="text-gray-500 hover:text-gray-700">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
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
                {categoryData.map((entry, index) => (
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

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Products</h3>
          <div className="flex">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search products..."
                className="py-2 pl-8 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
              Add Product
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Name
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Description
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Category
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Images
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Price
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Discount
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Quantity
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} >
                  <td className="py-3 px-4">{product.title}</td>
                  <td className="py-3 px-4">{product.description}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-1">
                      {product.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5555${img}`}
                          alt={`Product ${product.id} image ${idx}`}
                          className="w-8 h-8 rounded object-cover"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.discount}</td>
                  <td className="py-3 px-4">{product.quantity}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b p-4">
          <h3 className="text-lg font-medium">Recent Activity</h3>
        </div>
        <div className="p-4">
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New product added</p>
                  <p className="text-sm text-gray-500">
                    Nike Shoe was added to inventory
                  </p>
                </div>
                <p className="ml-auto text-sm text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="py-3">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New sale completed</p>
                  <p className="text-sm text-gray-500">
                    Customer purchased 3 items for Rs. 5,400
                  </p>
                </div>
                <p className="ml-auto text-sm text-gray-500">4 hours ago</p>
              </div>
            </li>
            <li className="py-3">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Users className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">New customer registered</p>
                  <p className="text-sm text-gray-500">
                    John Doe created an account
                  </p>
                </div>
                <p className="ml-auto text-sm text-gray-500">6 hours ago</p>
              </div>
            </li>
            <li className="py-3">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Package className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Product updated</p>
                  <p className="text-sm text-gray-500">
                    Updated product stock quantity
                  </p>
                </div>
                <p className="ml-auto text-sm text-gray-500">8 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
export default Dashboard;
