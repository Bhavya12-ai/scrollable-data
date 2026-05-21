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

export function totalPrice(transactions) {
  const result = {};

  transactions.forEach((item) => {
    const { customerID, customerName, amount, date } = item;
    const month = MONTHS[new Date(date).getMonth()];
    console.log(month);
    let points = 0;

    if (amount > 100) {
      points += (amount - 100) * 2;
      points += 50;
    } else if (amount > 50) {
      points += amount - 50;
    }

    if (!result[customerName]) {
      result[customerName] = {
        customerID,
        customerName,
        months: {},
        total: 0,
        totalAmount: 0,
        transactions: [],
      };
    }

    if (!result[customerName].customerID) {
      result[customerName].customerID = customerID;
    }

    result[customerName].months[month] =
      (result[customerName].months[month] || 0) + points;

    result[customerName].total += points;
    result[customerName].totalAmount += amount;
    result[customerName].transactions.push(item);
  });

  return result;
}
