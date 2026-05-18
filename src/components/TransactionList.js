import React from "react";
import "../common.css";
export default function TransactionList({ transactions }) {
  return (
    <div className="transactionList-container">
      {transactions.map((item) => (
        <div key={item.id}>
          ${item.amount} - {item.date}
        </div>
      ))}
    </div>
  );
}
``