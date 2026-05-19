import { useMemo } from "react";
import { totalPrice } from "./Rewards";

export function useRewards(transactions) {
  return useMemo(() => {
    if (!Array.isArray(transactions)) {
      return {};
    }
    return totalPrice(transactions);
  }, [transactions]);
}
