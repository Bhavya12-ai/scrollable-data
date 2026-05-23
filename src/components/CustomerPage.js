import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import transactions from "../data/transactionData";
import PropTypes from "prop-types";
import { useRewards } from "../utils/useRewards";
import CustomerDetails from "./CustomerDetails";

export default function CustomerPage({
  customerName,
  customerData: customerDataProp,
}) {
  const { name: routeName } = useParams();
  const [customerData, setCustomerData] = useState(customerDataProp || null);
  const [loading, setLoading] = useState(!customerDataProp);
  const rewards = useRewards(transactions);
  const name = customerName || routeName;

  useEffect(() => {
    if (!name) return;
    if (customerDataProp) {
      setCustomerData(customerDataProp);
      setLoading(false);
      return;
    }
    setCustomerData(rewards[name] || null);
    setLoading(false);
  }, [name, customerDataProp, rewards]);

  if (!name) return null;
  if (loading) return <h3 style={{ padding: "20px" }}>Loading..</h3>;

  return (
    <div className="app-container">
      <h2>{name}</h2>
      <CustomerDetails customer={name} details={customerData} />
    </div>
  );
}

CustomerPage.propTypes = {
  customerName: PropTypes.string,
  customerData: PropTypes.shape({
    customerID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total: PropTypes.number,
    totalAmount: PropTypes.number,
    months: PropTypes.objectOf(PropTypes.number),
    transactions: PropTypes.array,
  }),
};
