import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please check your payment details and try again.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
            <p className="text-gray-700 mb-2">Possible reasons for failure:</p>
            <ul className="text-left text-gray-600 list-disc pl-5">
              <li>Insufficient funds</li>
              <li>Incorrect card information</li>
              <li>Bank declined the transaction</li>
              <li>Network connectivity issues</li>
            </ul>
          </div>
          
          <div className="w-full space-y-3">
            <button 
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out"
              onClick={() => window.history.back()}
            >
              Try Again
            </button>
            
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              Browse Courses
            </button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            If you continue to experience issues, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;