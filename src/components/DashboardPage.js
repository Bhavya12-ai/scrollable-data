import React, { useEffect, useState, useMemo } from "react";
import { fetchTransactions } from "../services/api";
import { useRewards } from "../utils/useRewards";
import CustomerDetails from "./CustomerDetails";
import { LABELS, STYLES } from "../constants/dashboardConstants";
import { formatNumber } from "../utils/rewards";
import "../app.css";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rewardPeriod, setRewardPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const customers = useRewards(transactions);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTransactions().then((transactions) => {
        setTransactions(transactions);
        if (transactions.length) {
          const dates = transactions.map((item) => new Date(item.date));
          const minDate = new Date(Math.min(...dates));
          const maxDate = new Date(Math.max(...dates));
          setRewardPeriod(`${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()}`);
        }
      })
      .catch((error) => {
        setError(error?.message || "Please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalCustomers = Object.keys(customers).length;
  const totalRewardPoints = Object.values(customers).reduce(
    (sum, customer) => sum + (customer.total || 0),
    0,
  );

  const searchRandom = search.trim().toLowerCase();
  const filteredCustomers = useMemo(() => {
    return Object.entries(customers).filter(([customerID, data]) => {
      if (!searchRandom) return true;
      return (
        data.customerName.toLowerCase().includes(searchRandom) ||
        String(data.customerID).toLowerCase().includes(searchRandom) ||
        String(customerID).toLowerCase().includes(searchRandom)
      );
    });
  }, [customers, searchRandom]);

  const selectedCustomerData = selectedCustomer && customers[selectedCustomer] ? customers[selectedCustomer] : null;

  if (loading) return <h3 style={{ padding: "20px" }}>Loading transactions...</h3>;
  if (error) return <h3 style={{ padding: "20px", color: "red" }}>{error}</h3>;

  return (
    <div className="app-container" style={STYLES.container}>
      <div onClick={() => setShowTable(!showTable)} className="dashboard-header">
        <h2>{LABELS.TITLE}</h2>
        <p>{LABELS.TOTAL_CUSTOMERS}: {totalCustomers}</p>
        <p>{LABELS.TOTAL_POINTS}: {formatNumber(totalRewardPoints)}</p>
        <p>{LABELS.PERIOD}: {rewardPeriod}</p>
        <p style={STYLES.clickableText}>{showTable ? LABELS.HIDE : LABELS.SHOW}</p>
      </div>

      {showTable && (
        <div className="dashboard-content">
          <div className="card-wrapper">
            <div className="card-header">
              <h3>{LABELS.SUMMARY}</h3>
              <input type="text" className="card-input" placeholder="Search transactions" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {filteredCustomers.length === 0 ? (
              <p style={{ padding: "12px 0" }}>No customers found.</p>
            ) : (
              filteredCustomers.map(([customerID, data]) => (
                <div
                  key={customerID}
                  onClick={() => setSelectedCustomer(customerID)}
                  className="section-details"
                  style={selectedCustomer === customerID ? STYLES.selectedCard : STYLES.defaultCard} >
                  <p>{data.customerName}</p>
                  <p>ID: {data?.customerID ?? "0"}</p>
                  <p>Points: {formatNumber(data?.total ?? 0)}</p>
                  <p>Amount: ${formatNumber(data?.totalAmount ?? 0)}</p>
                </div>
              ))
            )}
          </div>

          {selectedCustomerData && (
            <div className="customer-details-panel">
              <h2>{selectedCustomerData.customerName}</h2>
              <CustomerDetails customer={selectedCustomerData.customerName} details={selectedCustomerData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;