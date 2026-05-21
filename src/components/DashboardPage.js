import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/Api";
import { useRewards } from "../utils/useRewards";
import CustomerDetails from "./CustomerDetails";
import { LABELS, STYLES } from "../constants/dashboardConstants";
import "../app.css";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rewardPeriod, setRewardPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const customers = useRewards(transactions);

  useEffect(() => {
    setLoading(true);
    fetchTransactions().then((transactions) => {
      setTransactions(transactions);
      console.log(transactions);
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
  if(loading) return <h3 style={{ padding: "20px" }}>Loading transactions...</h3>;

  const totalCustomers = Object.keys(customers).length;
  const totalRewardPoints = Object.values(customers).reduce(
    (sum, customer) => sum + (customer.total || 0),
    0,
  );

  const searchRandom = search.trim().toLowerCase();
  const filteredCustomers = useMemo(() => {
    return Object.entries(customers).filter(([name, data]) => {
      if (!searchRandom) return true;
      return (
        name.toLowerCase().includes(searchRandom) || String(data.customerID).toLowerCase().includes(searchRandom)
      );
    });
  }, [customers, searchRandom]);


  const selectedCustomerData = selectedCustomer && customers[selectedCustomer] ? customers[selectedCustomer] : null;

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
            <div className="card-header">
              <h3>{LABELS.SUMMARY}</h3>
              <input type="text" className="card-input" placeholder="Search transactions" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {filteredCustomers.length === 0 ? (
              <p style={{ padding: "12px 0" }}>No customers found.</p>
            ) : (
              filteredCustomers.map(([name, data]) => (
                <div
                  key={name}
                  onClick={() => setSelectedCustomer(name)}
                  className="section-details"
                  style={selectedCustomer === name ? STYLES.selectedCard : STYLES.defaultCard} >
                  <p>{name}</p>
                  <p>ID: {data?.customerID ?? "-"}</p>
                  <p>Points: {data?.total ?? 0}</p>
                  <p>Amount: {data?.totalAmount ?? 0}</p>
                </div>
              ))
            )}
          </div>

          {selectedCustomerData && (
            <div className="customer-details-panel">
              <h2>{selectedCustomer}</h2>
              <CustomerDetails customer={selectedCustomer} details={selectedCustomerData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;