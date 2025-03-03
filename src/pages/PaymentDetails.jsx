import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();

  // Use URLSearchParams to get query parameters from the location object
  const queryParams = new URLSearchParams(location.search);

  // Capture specific query parameters
  const txnId = queryParams.get("txnId");
  const amount = queryParams.get("amount");
  const totalAmount = queryParams.get("total_amount");
  const status = queryParams.get("status");
  const mobile = queryParams.get("mobile");
  const tidx = queryParams.get("tidx");
  const purchaseOrderId = queryParams.get("purchase_order_id");
  const purchaseOrderName = queryParams.get("purchase_order_name");
  const transactionId = queryParams.get("transaction_id");

  // Display the captured data
  return (
    <div>
      <h2>Payment Details</h2>
      <p>txnId: {txnId}</p>
      <p>Amount: {amount}</p>
      <p>Total Amount: {totalAmount}</p>
      <p>Status: {status}</p>
      <p>Mobile: {mobile}</p>
      <p>tidx: {tidx}</p>
      <p>Purchase Order ID: {purchaseOrderId}</p>
      <p>Purchase Order Name: {purchaseOrderName}</p>
      <p>Transaction ID: {transactionId}</p>
    </div>
  );
};

export default PaymentPage;
