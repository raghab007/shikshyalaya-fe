import { Routes, Link, Route, Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

function InstructorLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow   overflow-auto">
        <div className="bg-white rounded-lg shadow-sm ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-blue-700 hover:text-white transition-all duration-200 transform hover:translate-x-2"
    >
      {icon} <span className="ml-3 font-medium">{label}</span>
    </Link>
  );
}

function Users() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700">Users Management</h1>
      <p className="text-gray-500">Manage all users in the platform.</p>
    </div>
  );
}

function InstructorPaymentHistory() {
  // Sample data for instructor payments
  const paymentHistory = [
    {
      id: "PAY-2023-12-001",
      date: "2023-12-15",
      amount: 1250.0,
      courses: ["React Basics", "Advanced JavaScript"],
      students: 42,
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: "PAY-2023-11-001",
      date: "2023-11-15",
      amount: 980.5,
      courses: ["React Basics"],
      students: 35,
      status: "Paid",
      method: "PayPal",
    },
    {
      id: "PAY-2023-10-001",
      date: "2023-10-15",
      amount: 875.25,
      courses: ["React Basics"],
      students: 31,
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: "PAY-2023-09-001",
      date: "2023-09-15",
      amount: 1420.0,
      courses: ["React Basics", "Advanced JavaScript"],
      students: 48,
      status: "Paid",
      method: "PayPal",
    },
    {
      id: "PAY-2023-08-001",
      date: "2023-08-15",
      amount: 1680.75,
      courses: ["React Basics", "Advanced JavaScript", "Node.js Fundamentals"],
      students: 55,
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: "PAY-2023-07-pending",
      date: "2023-07-15",
      amount: 450.0,
      courses: ["Node.js Fundamentals"],
      students: 15,
      status: "Processing",
      method: "Bank Transfer",
    },
  ];

  // States for filtering and sorting
  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });

  // Get unique payment methods and statuses
  const uniquePaymentMethods = [
    ...new Set(paymentHistory.map((payment) => payment.method)),
  ];
  const uniqueStatuses = [
    ...new Set(paymentHistory.map((payment) => payment.status)),
  ];

  // Handle sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort payments
  const filteredPayments = paymentHistory
    .filter((payment) => {
      const paymentDate = new Date(payment.date);
      const matchesStartDate = dateRangeStart
        ? paymentDate >= new Date(dateRangeStart)
        : true;
      const matchesEndDate = dateRangeEnd
        ? paymentDate <= new Date(dateRangeEnd)
        : true;
      const matchesStatus = statusFilter
        ? payment.status === statusFilter
        : true;
      const matchesMethod = methodFilter
        ? payment.method === methodFilter
        : true;

      return (
        matchesStartDate && matchesEndDate && matchesStatus && matchesMethod
      );
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        const direction = sortConfig.direction === "ascending" ? 1 : -1;

        // Handle numeric sorting
        if (sortConfig.key === "amount" || sortConfig.key === "students") {
          return (a[sortConfig.key] - b[sortConfig.key]) * direction;
        }

        // Handle date sorting
        if (sortConfig.key === "date") {
          return (
            (new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])) *
            direction
          );
        }

        // Handle string sorting
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return -1 * direction;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return 1 * direction;
        }
      }
      return 0;
    });

  // Calculate summary statistics
  const totalEarnings = filteredPayments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingEarnings = filteredPayments
    .filter((payment) => payment.status === "Processing")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalStudents = filteredPayments.reduce(
    (sum, payment) => sum + payment.students,
    0
  );

  // Reset all filters
  const resetFilters = () => {
    setDateRangeStart("");
    setDateRangeEnd("");
    setStatusFilter("");
    setMethodFilter("");
    setSortConfig({ key: "date", direction: "descending" });
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Determine status badge style
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              Total Earnings
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalEarnings)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              Pending Payments
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(pendingEarnings)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              Total Students
            </h2>
            <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Payment History
            </h1>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRangeStart}
                  onChange={(e) => setDateRangeStart(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRangeEnd}
                  onChange={(e) => setDateRangeEnd(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Methods</option>
                  {uniquePaymentMethods.map((method, index) => (
                    <option key={index} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={resetFilters}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filteredPayments.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("id")}
                    >
                      <div className="flex items-center gap-1">
                        Payment ID {getSortDirectionIndicator("id")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("date")}
                    >
                      <div className="flex items-center gap-1">
                        Date {getSortDirectionIndicator("date")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("amount")}
                    >
                      <div className="flex items-center gap-1">
                        Amount {getSortDirectionIndicator("amount")}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Courses
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("students")}
                    >
                      <div className="flex items-center gap-1">
                        Students {getSortDirectionIndicator("students")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("status")}
                    >
                      <div className="flex items-center gap-1">
                        Status {getSortDirectionIndicator("status")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("method")}
                    >
                      <div className="flex items-center gap-1">
                        Method {getSortDirectionIndicator("method")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {payment.courses.map((course, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {payment.students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(payment.status)}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {payment.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No payment records match your filter criteria.</p>
                <button
                  onClick={resetFilters}
                  className="mt-2 text-blue-500 hover:text-blue-700 underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
            Showing {filteredPayments.length} out of {paymentHistory.length}{" "}
            payments
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Payment Reports
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Monthly Statement</option>
                <option>Quarterly Summary</option>
                <option>Annual Report</option>
                <option>Tax Document</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last Month</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="flex-1 flex items-end">
              <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorLayout;
