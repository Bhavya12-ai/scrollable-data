import transactions from "../data/transactionData";

export function fetchTransactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!transactions || !Array.isArray(transactions)) {
        reject(new Error("Transaction data unavailable"));
        return;
      }
      resolve(transactions);
    }, 1000);
  });
}