import transactions from "../data/transactionData";


export function fetchTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
}