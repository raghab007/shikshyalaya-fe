import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (status?.toLowerCase() === "completed") {
      const enrollCourse = async () => {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("No token found in localStorage");
            navigate("/login"); // Redirect to login if no token
            return;
          }

          const response = await axios.post(
            "http://localhost:8085/enrollment/"+purchaseOrderId,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if(response.data=="OK"){
            navigate("/enrolled")
          }
          setLoading(false);
        } catch (error) {
          console.error("Error enrolling in course:", error.response?.data || error.message);
          navigate("/courses"); // Redirect if there's an error
        }
      };

      enrollCourse();
    } else {
      navigate("/courses");
    }
  }, []); // Added dependencies

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <h1>Payment Successful!</h1>;
};

export default PaymentPage;
