"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import { OfficeSidebar } from "../components/layout/office-sidebar";
import { FileText, Receipt, TrendingUp } from "lucide-react";

export const OfficePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <OfficeSidebar />

      <div className="ml-64 p-8">
        <h1 className="text-4xl font-bold text-[#2d6e7e] mb-8 text-center">
          รับซื้อสินค้า
        </h1>

        <div className="max-w-lg mx-auto grid grid-cols-1 gap-6">
          {/* Pending Bills */}
          <button
            onClick={() => navigate("/office/pending-bills")}
            className="bg-[#2d6e7e] text-white p-8 rounded-lg hover:bg-[#245d6b] transition-colors flex items-center justify-center group"
          >
            <span className="text-2xl px-4 font-bold">บิลค้างจ่าย</span>
            <FileText
              size={32}
              className="transform group-hover:scale-110 transition-transform"
            />
          </button>

          {/* Paid Bills */}
          <button
            onClick={() => navigate("/office/paid-bills")}
            className="bg-[#2d6e7e] text-white p-8 rounded-lg hover:bg-[#245d6b] transition-colors flex items-center justify-center group"
          >
            <span className="text-2xl px-4 font-bold">บิลจ่ายแล้ว</span>
            <Receipt
              size={32}
              className="transform group-hover:scale-110 transition-transform"
            />
          </button>

          {/* Today's Prices */}
          <button
            onClick={() => navigate("/office/prices")}
            className="bg-[#2d6e7e] text-white p-8 rounded-lg hover:bg-[#245d6b] transition-colors flex items-center justify-center group"
          >
            <span className="text-2xl px-4 font-bold">ราคาวันนี้</span>
            <TrendingUp
              size={32}
              className="transform group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
