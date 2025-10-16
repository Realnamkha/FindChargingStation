import { useContext } from "react";
import { ShopsContext } from "../contexts/ShopContext";

export function useItems() {
  const context = useContext(ShopsContext);
  if (!context) {
    throw new Error("useUser must be used within ItemsProvider");
  }
  return context;
}
