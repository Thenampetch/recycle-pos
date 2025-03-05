"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/sidebar";
import { MaterialButton } from "../components/pos/MaterialButton";
import { CartItem as CartItemComponent } from "../components/pos/CartItem";
import { TransactionSummary } from "../components/pos/TransactionSum";
import { useCart } from "../content/CartContent";
import type { Material } from "../types";

// Sample materials data
const materialsByCategory: Record<string, Material[]> = {
  metal: [
    { id: "m1", name: "ติกสีรวม", price: 10, category: "metal" },
    { id: "m2", name: "ติกดำ", price: 12, category: "metal" },
    { id: "m3", name: "ติกเพทขาว", price: 15, category: "metal" },
  ],
  plastic: [
    { id: "p1", name: "พลาสติกเขียว", price: 8, category: "plastic" },
    { id: "p2", name: "แผ่นซีดี", price: 5, category: "plastic" },
    { id: "p3", name: "ติกกรอบ", price: 7, category: "plastic" },
  ],
  paper: [
    { id: "pa1", name: "กระดาษ", price: 3, category: "paper" },
    { id: "pa2", name: "เศษกระดาษ", price: 2, category: "paper" },
  ],
  glass: [
    { id: "g1", name: "แก้ว", price: 1, category: "glass" },
    { id: "g2", name: "ขวดแก้ว", price: 0.5, category: "glass" },
  ],
  other: [
    { id: "o1", name: "อลูมิเนียมขวด", price: 20, category: "other" },
    { id: "o2", name: "PVC รวม", price: 6, category: "other" },
    { id: "o3", name: "ท่อจอฟ้า", price: 4, category: "other" },
    { id: "o4", name: "PVC ฟ้าตรง", price: 7, category: "other" },
    { id: "o5", name: "PVC เหลืองตรง", price: 8, category: "other" },
  ],
};

export const POSPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("metal");
  const {
    items,
    addItem,
    removeItem,
    updateItemWeight,
    clearCart,
    totalAmount,
    totalWeight,
    member,
  } = useCart();
  const navigate = useNavigate();

  const handleMaterialClick = (material: Material) => {
    // Default weight is 1kg, can be updated later
    addItem(material, 1);
  };

  const handleCheckout = () => {
    // In a real app, you would save the transaction to a database
    alert(`Transaction completed!\nTotal: ${totalAmount.toFixed(2)} บาท`);
    clearCart();
    navigate("/membership");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this transaction?")) {
      clearCart();
      navigate("/membership");
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        activeMaterial={activeCategory}
        onMaterialChange={setActiveCategory}
      />

      <div className="ml-64 flex-1 p-4 flex">
        <div className="flex-1 pr-4">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">รับซื้อสินค้า</h1>
            {member && (
              <div className="bg-blue-100 px-4 py-2 rounded">
                <span className="font-medium">
                  ซื้อลูกค้า: {member.code} {member.name || "ลูกค้าทั่วไป"}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {materialsByCategory[activeCategory].map((material) => (
              <MaterialButton
                key={material.id}
                material={material}
                onClick={handleMaterialClick}
              />
            ))}
          </div>
        </div>

        <div className="w-80 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">รายการสินค้า</h2>

          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              ยังไม่มีรายการสินค้า
            </p>
          ) : (
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto mb-4">
              {items.map((item, index) => (
                <CartItemComponent
                  key={index}
                  item={item}
                  index={index}
                  onRemove={removeItem}
                  onUpdateWeight={updateItemWeight}
                />
              ))}
            </div>
          )}

          <TransactionSummary
            totalWeight={totalWeight}
            totalAmount={totalAmount}
            onCheckout={handleCheckout}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};
