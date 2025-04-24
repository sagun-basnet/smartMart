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
  ComposedChart,
  Area,
} from "recharts";
import {
  DollarSign,
  CreditCard,
  Calendar,
  Filter,
  Download,
  Search,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ChevronDown,
  X,
  Eye,
  Wallet,
  Banknote,
  Receipt,
  Repeat,
} from "lucide-react";
import { get } from "../utils/api";

export default function TransactionManagement() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch transactions data from the server (mocked here)
    // In a real application, you would replace this with an API call
    const fetchTransactions = async () => {
      // Mock API call
      const response = await get("/api/get-transactions"); // Replace with your API endpoint
      // console.log(response, "response transactions data");

      setTransactionsData(response);
    };

    fetchTransactions();
  }, []);

  const transactionTrendData = [
    { date: "Jan", credit: 145000, debit: 65000, netflow: 80000 },
    { date: "Feb", credit: 128000, debit: 72000, netflow: 56000 },
    { date: "Mar", credit: 165000, debit: 68000, netflow: 97000 },
    { date: "Apr", credit: 187000, debit: 71000, netflow: 116000 },
    { date: "May", credit: 173000, debit: 82000, netflow: 91000 },
    { date: "Jun", credit: 195000, debit: 76000, netflow: 119000 },
    { date: "Jul", credit: 220000, debit: 85000, netflow: 135000 },
    { date: "Aug", credit: 198000, debit: 90000, netflow: 108000 },
    { date: "Sep", credit: 210000, debit: 88000, netflow: 122000 },
    { date: "Oct", credit: 245000, debit: 92000, netflow: 153000 },
    { date: "Nov", credit: 267000, debit: 95000, netflow: 172000 },
    { date: "Dec", credit: 285000, debit: 110000, netflow: 175000 },
  ];

  const paymentMethodData = [
    { name: "Credit Card", value: 42 },
    { name: "UPI", value: 28 },
    { name: "Net Banking", value: 15 },
    { name: "Wallet", value: 8 },
    { name: "Cash on Delivery", value: 7 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

  const STATUS_COLORS = {
    Completed: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
    Refunded: "bg-purple-100 text-purple-800",
  };

  const STATUS_ICONS = {
    Completed: <CheckCircle2 className="h-4 w-4 mr-1" />,
    Processing: <RefreshCw className="h-4 w-4 mr-1" />,
    Pending: <Clock className="h-4 w-4 mr-1" />,
    Failed: <XCircle className="h-4 w-4 mr-1" />,
    Refunded: <Repeat className="h-4 w-4 mr-1" />,
  };

  const PAYMENT_ICONS = {
    "Credit Card": <CreditCard className="h-4 w-4 mr-1" />,
    "Debit Card": <CreditCard className="h-4 w-4 mr-1" />,
    UPI: <Wallet className="h-4 w-4 mr-1" />,
    "Net Banking": <Banknote className="h-4 w-4 mr-1" />,
    Wallet: <Wallet className="h-4 w-4 mr-1" />,
    "Cash on Delivery": <DollarSign className="h-4 w-4 mr-1" />,
    PayPal: <Wallet className="h-4 w-4 mr-1" />,
  };

  const transactionsData1 = [
    {
      id: "TXN-78521",
      date: "23 Apr 2025, 14:32",
      customer: "Rahul Sharma",
      amount: "₹12,500",
      paymentMethod: "Credit Card",
      orderID: "#ORD-7845",
      status: "Completed",
      type: "Payment",
      cardDetails: "**** **** **** 4123",
      bankDetails: "HDFC Bank",
      notes: "First purchase",
    },
    {
      id: "TXN-78520",
      date: "23 Apr 2025, 13:45",
      customer: "Priya Patel",
      amount: "₹8,999",
      paymentMethod: "UPI",
      orderID: "#ORD-7844",
      status: "Completed",
      type: "Payment",
      cardDetails: "",
      bankDetails: "ICICI Bank",
      notes: "",
    },
    {
      id: "TXN-78519",
      date: "23 Apr 2025, 11:20",
      customer: "Suresh Kumar",
      amount: "₹3,450",
      paymentMethod: "Wallet",
      orderID: "#ORD-7843",
      status: "Processing",
      type: "Payment",
      cardDetails: "",
      bankDetails: "PhonePe",
      notes: "",
    },
    {
      id: "TXN-78518",
      date: "22 Apr 2025, 18:54",
      customer: "Ananya Singh",
      amount: "₹2,399",
      paymentMethod: "Net Banking",
      orderID: "#ORD-7842",
      status: "Failed",
      type: "Payment",
      cardDetails: "",
      bankDetails: "SBI",
      notes: "Insufficient funds",
    },
    {
      id: "TXN-78517",
      date: "22 Apr 2025, 16:32",
      customer: "Vikram Mehta",
      amount: "₹1,750",
      paymentMethod: "Credit Card",
      orderID: "#ORD-7841",
      status: "Completed",
      type: "Payment",
      cardDetails: "**** **** **** 6745",
      bankDetails: "Axis Bank",
      notes: "",
    },
    {
      id: "TXN-78516",
      date: "22 Apr 2025, 14:15",
      customer: "Ritu Gupta",
      amount: "₹5,999",
      paymentMethod: "Debit Card",
      orderID: "#ORD-7840",
      status: "Refunded",
      type: "Refund",
      cardDetails: "**** **** **** 3012",
      bankDetails: "HDFC Bank",
      notes: "Item damaged",
    },
    {
      id: "TXN-78515",
      date: "22 Apr 2025, 10:09",
      customer: "Arjun Nair",
      amount: "₹4,250",
      paymentMethod: "UPI",
      orderID: "#ORD-7839",
      status: "Completed",
      type: "Payment",
      cardDetails: "",
      bankDetails: "Google Pay",
      notes: "",
    },
    {
      id: "TXN-78514",
      date: "21 Apr 2025, 19:28",
      customer: "Shreya Verma",
      amount: "₹9,800",
      paymentMethod: "PayPal",
      orderID: "#ORD-7838",
      status: "Pending",
      type: "Payment",
      cardDetails: "",
      bankDetails: "PayPal",
      notes: "International order",
    },
  ];

  const filteredTransactions =
    filterStatus === "All"
      ? transactionsData
      : transactionsData.filter(
          (transaction) => transaction.status === filterStatus
        );

  const handleViewTransaction = (transaction) => {
    // console.log(transaction, "transaction data");

    setSelectedTransaction(transaction);
  };

  const dateOptions = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "Last 3 Months",
    "All Time",
  ];

  return (
    <main className="p-6 bg-gray-100">
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Transaction Trends</h3>
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
            <ComposedChart
              data={transactionTrendData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="credit" fill="#3b82f6" name="Credit (₹)" />
              <Bar dataKey="debit" fill="#ef4444" name="Debit (₹)" />
              <Line
                type="monotone"
                dataKey="netflow"
                stroke="#10b981"
                name="Net Cash Flow (₹)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Payment Methods</h3>
            <button className="text-gray-500 hover:text-gray-700">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
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
                {paymentMethodData.map((entry, index) => (
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

      {/* Transaction List */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Transaction History</h3>
          <div className="flex">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search transactions..."
                className="py-2 pl-8 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Status filter dropdown */}
            <div className="relative mr-4">
              <button
                className="bg-white border border-gray-300 py-2 px-4 rounded-lg flex items-center text-gray-700"
                onClick={() => {
                  setIsStatusDropdownOpen(!isStatusDropdownOpen);
                  setIsDateDropdownOpen(false);
                }}
              >
                Status: {filterStatus} <ChevronDown className="ml-2 h-4 w-4" />
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

            {/* Date filter dropdown */}
            <div className="relative mr-4">
              <button
                className="bg-white border border-gray-300 py-2 px-4 rounded-lg flex items-center text-gray-700"
                onClick={() => {
                  setIsDateDropdownOpen(!isDateDropdownOpen);
                  setIsStatusDropdownOpen(false);
                }}
              >
                Period: {dateFilter} <ChevronDown className="ml-2 h-4 w-4" />
              </button>

              {isDateDropdownOpen && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg">
                  <ul className="py-1">
                    {dateOptions.map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDateFilter(option);
                          setIsDateDropdownOpen(false);
                        }}
                      >
                        {option}
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
                  Transaction ID
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Date & Time
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Customer
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Amount
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Payment Method
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Status
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-3 px-4 font-medium">
                    {transaction.transaction_id}
                  </td>
                  <td className="py-3 px-4">
                    {
                      new Date(transaction.payment_date)
                        .toISOString()
                        .split("T")[0]
                    }
                  </td>
                  <td className="py-3 px-4">{transaction.name}</td>
                  <td className="py-3 px-4 font-medium">
                    {transaction.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center text-green-400">
                      <Wallet className="h-4 w-4 mr-1" />
                      ESEWA
                    </span>
                  </td>
                  <td className="py-3 px-4">{transaction.sales_id}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 ${
                        STATUS_COLORS[transaction.tracking]
                      } rounded-full text-xs flex items-center inline-flex`}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                      Compeleted
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                        onClick={() => handleViewTransaction(transaction)}
                      >
                        <Eye className="h-3 w-3 mr-1" /> View
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
          <p className="text-sm text-gray-500">
            Showing 1-8 of 2,458 transactions
          </p>
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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center">
                <Receipt className="h-5 w-5 mr-2" />
                Transaction Details
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedTransaction(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Transaction Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium">
                    {selectedTransaction.transaction_id}
                  </h4>
                  <p className="text-gray-500">
                    {
                      new Date(selectedTransaction.payment_date)
                        .toISOString()
                        .split("T")[0]
                    }
                  </p>
                </div>
                <span
                  className={`px-3 py-1 ${
                    STATUS_COLORS[selectedTransaction.status]
                  } rounded-full text-sm flex items-center`}
                >
                  {STATUS_ICONS["Completed"]}
                  {selectedTransaction.transaction_status}
                </span>
              </div>

              {/* Transaction Amount */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-500 text-sm">Transaction Amount</p>
                <h3 className="text-2xl font-bold text-blue-700">
                  {selectedTransaction.amount}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {selectedTransaction.type !== "Payment"
                    ? "Payment"
                    : "Refund"}{" "}
                  • {selectedTransaction.paymentMethod}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Customer</p>
                  <p className="font-medium">{selectedTransaction.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Order ID</p>
                  <p className="font-medium">{selectedTransaction.sales_id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Payment Method</p>
                  <p className="font-medium flex items-center">
                    <Wallet className="h-4 w-4 mr-1" />
                    ESEWA
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Transaction Type</p>
                  <p className="font-medium">Wallet</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <h5 className="font-medium mb-2">Payment Details</h5>
                <div className="p-4 bg-gray-50 rounded-lg">
                  {selectedTransaction.cardDetails && (
                    <div className="mb-2">
                      <p className="text-gray-500 text-sm">Card Details</p>
                      <p>{selectedTransaction.cardDetails}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500 text-sm">Bank/Wallet</p>
                    <p>{selectedTransaction.bankDetails}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedTransaction.notes && (
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Notes</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p>{selectedTransaction.notes}</p>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h5 className="font-medium mb-2">Transaction Timeline</h5>
                <div className="border-l-2 border-gray-200 pl-4 py-2 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-6 mt-1 w-4 h-4 rounded-full bg-blue-500"></div>
                    <p className="font-medium">Transaction complete</p>
                    <p className="text-gray-500 text-sm">
                      {
                        new Date(selectedTransaction.payment_date)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center"
                onClick={() => setSelectedTransaction(null)}
              >
                Close
              </button>
              <button className="px-4 py-2 flex items-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-4 w-4 mr-1" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
