"use client";

import type React from "react";
import { useState } from "react";
import type { CartItem as CartItemType } from "../../types";
import { Pencil, X, Image } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  index: number;
  onRemove: (index: number) => void;
  onUpdateWeight: (index: number, weight: number, deduction: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  index,
  onRemove,
  onUpdateWeight,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState(item.weight.toString());
  const [deduction, setDeduction] = useState(item.deduction.toString());

  const handleSave = () => {
    const newWeight = Number.parseFloat(weight);
    const newDeduction = Number.parseFloat(deduction);
    if (
      !isNaN(newWeight) &&
      newWeight > 0 &&
      !isNaN(newDeduction) &&
      newDeduction >= 0
    ) {
      onUpdateWeight(index, newWeight, newDeduction);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded mb-2 border-l-4 border-teal-500 relative">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-medium">{item.material.name}</h3>
        <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm inline-block mb-2">
          {item.material.price.toFixed(2)} บาท/กก.
        </div>
        <div className="flex gap-2">
          <button
            className="text-teal-600 hover:text-teal-800"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={20} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onRemove(index)}
          >
            <X size={25} />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <div>
              <span>หนัก:</span>
              <input
                type="number"
                className="w-20 p-1 border rounded mx-1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <span>หัก:</span>
              <input
                type="number"
                className="w-20 p-1 border rounded mx-1"
                value={deduction}
                onChange={(e) => setDeduction(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
              onClick={handleSave}
            >
              บันทึก
            </button>
          </div>
        ) : (
          <div>
            หนัก: {item.weight.toFixed(2)} หัก: {item.deduction.toFixed(2)} ={" "}
            {item.netWeight.toFixed(2)}
          </div>
        )}
        <button className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center">
          <Image size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};
