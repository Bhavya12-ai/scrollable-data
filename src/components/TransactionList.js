import React from "react";
import PropTypes from "prop-types";
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

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
