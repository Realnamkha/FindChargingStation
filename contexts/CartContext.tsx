// contexts/CartContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

export type CartItem = {
  $id: string;
  name: string;
  price: number;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: { $id: string; name: string; price: number }) => void;
  removeFromCart: (itemId: string) => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: { $id: string; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.$id === item.$id);
      if (existing) {
        return prev.map((i) =>
          i.$id === item.$id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(
      (prev) =>
        prev
          .map((i) =>
            i.$id === itemId ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0) // remove if quantity 0
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
