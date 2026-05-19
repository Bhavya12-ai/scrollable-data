import React from "react";
import "../app.css";
export default function TransactionList({ transactions }) {
  return (
    <div className="transactionList-container">
      {transactions.map((item) => (
        <div key={item.id} className="transaction-details">
          ${item.amount} - {item.date}
        </div>
      ))}
    </div>
  );
}