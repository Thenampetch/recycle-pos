"use client";

import type React from "react";

import { createContext, useContext, useState } from "react";
import type { CartItem, Material, Member } from "../types";

interface CartContextType {
  items: CartItem[];
  addItem: (material: Material, weight: number) => void;
  removeItem: (index: number) => void;
  updateItemWeight: (index: number, weight: number, deduction: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalWeight: number;
  member: Member | null;
  setMember: (member: Member | null) => void;
  truckWeight: number;
  setTruckWeight: (weight: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [member, setMember] = useState<Member | null>(null);
  const [truckWeight, setTruckWeight] = useState(0);

  const addItem = (material: Material, weight: number) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.material.id === material.id
      );

      if (existingItemIndex !== -1) {
        const newItems = [...prevItems];
        const newWeight = newItems[existingItemIndex].weight + weight;
        const deduction = newItems[existingItemIndex].deduction;
        const netWeight = newWeight - deduction;
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          weight: newWeight,
          netWeight: netWeight,
          total: netWeight * material.price,
        };
        return newItems;
      } else {
        return [
          ...prevItems,
          {
            material: material,
            weight: weight,
            deduction: 0,
            netWeight: weight,
            total: material.price * weight,
          },
        ];
      }
    });
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const updateItemWeight = (
    index: number,
    weight: number,
    deduction: number
  ) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const netWeight = weight - deduction;
      newItems[index] = {
        ...newItems[index],
        weight: weight,
        deduction: deduction,
        netWeight: netWeight,
        total: netWeight * newItems[index].material.price,
      };
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    setTruckWeight(0);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
  const totalWeight = items.reduce((sum, item) => sum + item.netWeight, 0);
  const netWeight = totalWeight - truckWeight;

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateItemWeight,
    clearCart,
    totalAmount,
    totalWeight,
    member,
    setMember,
    truckWeight,
    setTruckWeight,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
