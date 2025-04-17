import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Receipt, ArrowRight, Mail } from "lucide-react";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  // Generate a random transaction ID
  const transactionId = React.useMemo(
    () => `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    []
  );

  // Current date formatting
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Animation effect
  useEffect(() => {
    // Confetti effect could be added here with a library
    const timer = setTimeout(() => {
      document
        .getElementById("success-card")
        .classList.remove("scale-95", "opacity-0");
      document
        .getElementById("success-card")
        .classList.add("scale-100", "opacity-100");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Background decoration elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-100 rounded-full opacity-40 blur-3xl"></div>

      {/* Main content card */}
      <div
        id="success-card"
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform scale-95 opacity-0 transition-all duration-500 ease-out"
      >
        <div className="flex flex-col items-center text-center">
          {/* Success icon with animation */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full mb-6 shadow-lg shadow-green-200">
            <CheckCircle className="h-14 w-14 text-white" strokeWidth={2.5} />
          </div>

          {/* Success message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Your payment has been processed successfully. The course is now
            ready for you to start learning!
          </p>

          {/* Transaction details card */}
          <div className="bg-gray-50 p-6 rounded-xl w-full mb-8 shadow-inner">
            <h3 className="font-medium text-gray-700 mb-4 text-left">
              Payment Details
            </h3>

            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center text-gray-600">
                <Receipt className="h-4 w-4 mr-2" />
                <span>Transaction ID</span>
              </div>
              <span className="font-semibold text-gray-800">
                {transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Date</span>
              </div>
              <span className="font-semibold text-gray-800">{currentDate}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full space-y-4">
            <button
              onClick={() => navigate("/enrolled")}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3.5 px-4 rounded-xl transition duration-300 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <span>Go to My Courses</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-transparent hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition duration-300 ease-in-out border border-gray-200"
            >
              Return to Homepage
            </button>
          </div>

          {/* Confirmation message */}
          <div className="mt-8 text-sm text-gray-500 flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <p>
              A confirmation email with receipt has been sent to your inbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
