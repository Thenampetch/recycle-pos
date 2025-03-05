"use client";

import type React from "react";
import { useState } from "react";
import type { CartItem as CartItemType } from "../../types";
import { Pencil, X } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  index: number;
  onRemove: (index: number) => void;
  onUpdateWeight: (index: number, weight: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  index,
  onRemove,
  onUpdateWeight,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState(item.weight.toString());

  const handleSave = () => {
    const newWeight = Number.parseFloat(weight);
    if (!isNaN(newWeight) && newWeight > 0) {
      onUpdateWeight(index, newWeight);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded mb-2 relative">
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={() => onRemove(index)}
      >
        <X size={18} />
      </button>

      <div className="flex justify-between items-center">
        <h3 className="font-medium">{item.material.name}</h3>
        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm">
          {item.material.price} บาท/กก.
        </span>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">น้ำหนัก:</span>
          {isEditing ? (
            <input
              type="number"
              className="w-20 p-1 border rounded"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              <span className="font-bold">{item.weight}</span>
              <button
                className="ml-2 text-blue-500"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={14} />
              </button>
            </>
          )}
        </div>
        <span className="font-bold">= {item.total.toFixed(2)}</span>
      </div>
    </div>
  );
};
