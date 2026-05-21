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
  const name = customerName || routeName;
  const [customerData, setCustomerData] = useState(customerDataProp || null);
  const [loading, setLoading] = useState(!customerDataProp);
  const rewards = useRewards(transactions);

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
  if (loading) return <h3 style={{ padding: "20px" }}>Loading customer...</h3>;

  return (
    <div style={{ padding: "20px" }}>
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
