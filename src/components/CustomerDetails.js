import React, { useState } from "react";
import TransactionList from "./TransactionList";
import PropTypes from "prop-types";
import { MONTHS } from "../constants/dashboardConstants";
import "../app.css";

export default function CustomerDetails({ customer, details }) {
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  if (!details) return null;

  const monthlyTransactions = selectedMonth
    ? details.transactions.filter((item) => {
        const month = MONTHS[new Date(item.date).getMonth()];
        return month === selectedMonth;
      })
    : [];

  return (
    <div className="customerDetails-container">
      <div className="customerSummary-container">
        <h3>{customer}</h3>
        <div className="customerSummary">
          <p>ID: {details.customerID}</p>
          <p>Total Reward: {details.total} points</p>
          <p>Total Spent: ${details.totalAmount}</p>
        </div>
        <div className="monthlyRewards">
          {Object.entries(details.months).map(([month, points]) => (
            <div key={month} className="monthly-reward">
              <p className="monthly-view">
                {month}: {points} points
              </p>
              <button
                type="button"
                className="details-button"
                onClick={() =>
                  setSelectedMonth((prev) => (prev === month ? null : month))
                }
              >
                {selectedMonth === month ? "Hide Transactions" : "View Transactions"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedMonth && (
        <div className="transactionDetails-container">
          <h4 className="transaction-header">{selectedMonth} Transactions</h4>
          <TransactionList transactions={monthlyTransactions} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowTransactions((prev) => !prev)}
        className="details-button"
      >
        {showTransactions ? "Hide All Details" : "Show All Details"}
      </button>

      {showTransactions && (
        <div className="transactionDetails-container">
          <h4 className="transaction-header">All Transactions</h4>
          <TransactionList transactions={details.transactions} />
        </div>
      )}
    </div>
  );
}
