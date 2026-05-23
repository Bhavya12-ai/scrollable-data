import { MONTHS } from "../constants/dashboardConstants";

export function calculateTotal(amount) {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += amount - 50;
  }
  return points;
}

export function formatNumber(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return value;
  return Number.isInteger(value) ? value : value.toFixed(2);
}

export function totalPrice(transactions) {
  const result = {};

  transactions.forEach((item) => {
    const { customerID, customerName, amount, date } = item;
    const month = MONTHS[new Date(date).getMonth()];
    const points = calculateTotal(amount);

    if (!result[customerID]) {
      result[customerID] = {
        customerID,
        customerName,
        months: {},
        total: 0,
        totalAmount: 0,
        transactions: [],
      };
    }

    result[customerID].months[month] =
      (result[customerID].months[month] || 0) + points;

    result[customerID].total += points;
    result[customerID].totalAmount += amount;
    result[customerID].transactions.push(item);
  });

  return result;
}
