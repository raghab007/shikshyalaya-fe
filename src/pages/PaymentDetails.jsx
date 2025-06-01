import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get query parameters
  const queryParams = new URLSearchParams(location.search);
  const txnId = queryParams.get("txnId");
  const amount = queryParams.get("amount");
  const totalAmount = queryParams.get("total_amount");
  const status = queryParams.get("status");
  const mobile = queryParams.get("mobile");
  const tidx = queryParams.get("tidx");
  const purchaseOrderId = queryParams.get("purchase_order_id");
  const purchaseOrderName = queryParams.get("purchase_order_name");
  const transactionId = queryParams.get("transaction_id");

  const [loading, setLoading] = useState(true);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const enrollUser = async () => {
      try {
        // Validate required parameters
        if (!purchaseOrderId) {
          throw new Error("Course ID is missing");
        }

        if (status?.toLowerCase() !== "completed") {
          throw new Error("Payment not completed");
        }

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required. Please log in.");
        }

        // Make enrollment API call
        const response = await axios.post(
          `http://localhost:8085/enrollment/${purchaseOrderId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if enrollment was successful
        if (response.data === "OK") {
          setEnrollmentSuccess(true);
        } else {
          throw new Error("Enrollment failed. Please contact support.");
        }
      } catch (error) {
        console.error("Enrollment error:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to complete enrollment"
        );
        setEnrollmentSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    // Only proceed with enrollment if payment status is "completed"
    if (status?.toLowerCase() === "completed") {
      enrollUser();
    } else {
      setLoading(false);
      setEnrollmentSuccess(false);
      setError("Payment was not completed or was unsuccessful.");
    }
  }, [status, purchaseOrderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <h1 className="text-xl font-semibold text-gray-800">
          Processing your enrollment...
        </h1>
        <p className="text-gray-600 mt-2">
          Please wait while we enroll you in the course
        </p>
      </div>
    );
  }

  if (enrollmentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Enrollment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              You have been successfully enrolled in the course.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium">
                  {purchaseOrderName || "Your course"}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">
                  {transactionId || txnId || tidx || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  Rs. {totalAmount / 100 || amount / 100 || "N/A"}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/enrolled")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              Go to My Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Enrollment failed case
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {status?.toLowerCase() === "completed"
              ? "Enrollment Failed"
              : "Payment Failed"}
          </h1>

          <p className="text-gray-600 mb-6">
            {error ||
              (status?.toLowerCase() === "completed"
                ? "We couldn't complete your enrollment."
                : "We couldn't complete your payment.")}
          </p>

          <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
            <p className="text-gray-700 mb-2">Transaction details:</p>
            <div className="text-left text-gray-600">
              <p>Course: {purchaseOrderName || "N/A"}</p>
              <p>Reference: {transactionId || txnId || tidx || "N/A"}</p>
              <p>Amount: Rs. {totalAmount || amount || "N/A"}</p>
              <p>Status: {status || "N/A"}</p>
            </div>
          </div>

          <div className="w-full space-y-3">
            {purchaseOrderId && (
              <button
                onClick={() => navigate(`/course/${purchaseOrderId}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                Try Again
              </button>
            )}
            <button
              onClick={() => navigate("/courses")}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Browse Other Courses
            </button>
            <button
              onClick={() => navigate("/support")}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
