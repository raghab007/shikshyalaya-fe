import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your transaction has been completed successfully. Thank you for your purchase!
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium">TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/enrolled')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            Go to My Courses
          </button>
          
          <p className="mt-6 text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;