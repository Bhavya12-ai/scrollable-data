import { useMemo } from "react";
import { totalPrice } from "./rewards";

export function useRewards(transactions) {
  return useMemo(() => {
    if (!Array.isArray(transactions)) {
      return {};
    }
    return totalPrice(transactions);
  }, [transactions]);
}
