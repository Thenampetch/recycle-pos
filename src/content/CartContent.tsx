"use client";

import type React from "react";
import { createContext, useState, useContext, type ReactNode } from "react";
import type { CartItem, Material, Member } from "../types";

interface CartContextType {
  items: CartItem[];
  member: Member | null;
  addItem: (material: Material, weight: number) => void;
  removeItem: (index: number) => void;
  updateItemWeight: (index: number, weight: number) => void;
  clearCart: () => void;
  setMember: (member: Member | null) => void;
  totalAmount: number;
  totalWeight: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [member, setMember] = useState<Member | null>(null);

  const addItem = (material: Material, weight: number) => {
    const total = material.price * weight;
    setItems([...items, { material, weight, total }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItemWeight = (index: number, weight: number) => {
    const newItems = [...items];
    newItems[index].weight = weight;
    newItems[index].total = newItems[index].material.price * weight;
    setItems(newItems);
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        member,
        addItem,
        removeItem,
        updateItemWeight,
        clearCart,
        setMember,
        totalAmount,
        totalWeight,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
