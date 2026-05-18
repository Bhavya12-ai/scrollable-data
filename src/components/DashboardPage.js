import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/Api";
import { totalPrice } from "../utils/Rewards";
import CustomerDetails from "./CustomerDetails";
import { LABELS, STYLES } from "../constants/dashboardConstants";
import "../app.css";

function DashboardPage() {
  const [customers, setCustomers] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rewardPeriod, setRewardPeriod] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions().then((transactions) => {
      const mappedCustomers = totalPrice(transactions);
      setCustomers(mappedCustomers);

      if (transactions.length) {
        const dates = transactions.map((item) => new Date(item.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        setRewardPeriod(
          `${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()}`
        );
      }
      setLoading(false);
    });
  }, []);

  const totalCustomers = Object.keys(customers).length;
  const totalRewardPoints = Object.values(customers).reduce(
    (sum, customer) => sum + (customer.total || 0),
    0
  );

  return (
    <div style={STYLES.container}>
      <div onClick={() => setShowTable(!showTable)} className="dashboard-header">
        <h2>{LABELS.TITLE}</h2>
        <p>{LABELS.TOTAL_CUSTOMERS}: {totalCustomers}</p>
        <p>{LABELS.TOTAL_POINTS}: {totalRewardPoints}</p>
        <p>{LABELS.PERIOD}: {rewardPeriod}</p>
        <p style={STYLES.clickableText}>{showTable ? LABELS.HIDE : LABELS.SHOW}</p>
      </div>

      {showTable && (
        <div className="dashboard-content">
          <div className="card-wrapper">
            <h3>{LABELS.SUMMARY}</h3>
            {Object.entries(customers).map(([name, data]) => (
              <div
                key={name}
                onClick={() => setSelectedCustomer(name)}
                className="section-details"
                style={selectedCustomer === name? STYLES.selectedCard : STYLES.defaultCard} >
                <p>{name}</p>
                <p>ID: {data?.customerID ?? "-"}</p>
                <p>Points: {data?.total ?? 0}</p>
                <p>Amount: {data?.totalAmount ?? 0}</p>
              </div>
            ))}
          </div>

          {selectedCustomer && customers[selectedCustomer] && (
            <div className="customer-details-panel">
              <h2>{selectedCustomer}</h2>
              <CustomerDetails customer={selectedCustomer} details={customers[selectedCustomer]} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;