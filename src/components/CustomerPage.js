import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import transactions from "../data/transactionData";
import { totalPrice } from "../utils/Rewards";
import CustomerDetails from "./CustomerDetails";

export default function CustomerPage({ customerName, customerData: customerDataProp }) {
  const { name: routeName } = useParams();
  const name = customerName || routeName;
  const [customerData, setCustomerData] = useState(customerDataProp || null);
  const [loading, setLoading] = useState(!customerDataProp);

  useEffect(() => {
    if (!name) return;

    if (customerDataProp) {
      setCustomerData(customerDataProp);
      setLoading(false);
      return;
    }

    const data = totalPrice(transactions);
    setCustomerData(data[name] || null);
    setLoading(false);
  }, [name, customerDataProp]);

  if (!name) return null;
  if (loading) return <h3 style={{ padding: "20px" }}>Loading customer...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{name}</h2>
      <CustomerDetails customer={name} details={customerData} />
    </div>
  );
}