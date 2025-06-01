import { useState } from 'react';

export default function PaymentHistory() {
  const [searchDate, setSearchDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  
  // Sample payment data with payment method instead of status
  const paymentData = [
    { id: 'TXN12345678', date: '2023-10-01', amount: 'Rs 100.00', paymentMethod: 'Khalti' },
    { id: 'TXN12345679', date: '2023-10-02', amount: 'Rs 75.50', paymentMethod: 'Khalti' },
    { id: 'TXN12345680', date: '2023-10-03', amount: 'Rs 210.25', paymentMethod: 'Khalti' },
    { id: 'TXN12345681', date: '2023-10-04', amount: 'Rs 50.00', paymentMethod: 'Khalti' },
    { id: 'TXN12345682', date: '2023-10-05', amount: 'Rs 125.75', paymentMethod: 'Khalti' },
    { id: 'TXN12345683', date: '2023-10-06', amount: 'Rs 300.00', paymentMethod: 'Khalti' },
    { id: 'TXN12345684', date: '2023-10-07', amount: 'Rs 85.25', paymentMethod: 'Khalti' },
    { id: 'TXN12345685', date: '2023-10-08', amount: 'Rs 150.00', paymentMethod: 'Khalti' },
  ];

  // Filter payments based on search date
  const filteredPayments = searchDate
    ? paymentData.filter(payment => payment.date.includes(searchDate))
    : paymentData;

  // Calculate pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filter changes
  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
    setCurrentPage(1);
  };

  // Clear filter and reset page
  const clearFilter = () => {
    setSearchDate('');
    setCurrentPage(1);
  };

  // Get payment method badge styling
  const getPaymentMethodBadge = (method) => {
    switch (method) {
      case 'Khalti':
        return 'bg-purple-100 text-purple-800';
      case 'Credit Card':
        return 'bg-blue-100 text-blue-800';
      case 'PayPal':
        return 'bg-indigo-100 text-indigo-800';
      case 'Bank Transfer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment History</h1>
      
      {/* Search section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-64">
            <label htmlFor="dateSearch" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Date
            </label>
            <input
              id="dateSearch"
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchDate}
              onChange={handleDateChange}
            />
          </div>
          {searchDate && (
            <button 
              className="mt-6 px-2 py-1 text-sm text-gray-600 hover:text-gray-900" 
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
      
      {/* Payment table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentMethodBadge(payment.paymentMethod)}`}>
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.id}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No payments found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination and Summary */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPayments.length)} of {filteredPayments.length} transactions
        </div>
        
        {totalPages > 1 && (
          <div className="flex space-x-1">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}