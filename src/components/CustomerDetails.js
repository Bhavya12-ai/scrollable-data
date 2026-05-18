import React, { useState } from "react";
import TransactionList from "./TransactionList";
import '../common.css'
export default function CustomerDetails({ customer, details }) {
  const [showTransactions, setShowTransactions] = useState(false);

  if (!details) return null;

  return (
    <div className="customerDetails-container">
      <div>
        <h3>{customer}</h3>
        <p>ID: {details.customerID}</p>
        <p>Total Reward: {details.total} points</p>
        <p>Total Spent: ${details.totalAmount}</p>

        {Object.entries(details.months).map(([month, points]) => (
          <p key={month}>{month}: {points} points</p>
        ))}

        <button
          type="button"
          onClick={() => setShowTransactions((prev) => !prev)}
          className="details-button"
          >
          {showTransactions ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {showTransactions && (
        <div className="transactionDetails-container">
          <h4 style={{ marginTop: 0, marginBottom: "10px" }}> Transaction Details</h4>
          <TransactionList transactions={details.transactions} />
        </div>
      )}
    </div>
  );
}