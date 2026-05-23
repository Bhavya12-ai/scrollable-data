import React from "react";
import PropTypes from "prop-types";
import "../app.css";

export default function TransactionList({ transactions }) {
  return (
    <div className="transactionList-container">
      <div className="transaction-row transaction-row-head">
        <span className="transaction-cell amount">Amount</span>
        <span className="transaction-cell date">Date</span>
      </div>

      {transactions.length === 0 ? (
        <div className="transaction-row empty-row">No transactions available.</div>
      ) : (
        transactions.map((item) => (
          <div key={item.id} className="transaction-row">
            <span className="transaction-cell amount">${item.amount.toFixed(2)}</span>
            <span className="transaction-cell date">{item.date}</span>
          </div>
        ))
      )}
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
