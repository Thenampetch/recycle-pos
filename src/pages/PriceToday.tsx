"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OfficeSidebar } from "../components/layout/office-sidebar";
import { Search, ArrowLeft, FileText, Printer, Download } from "lucide-react";

// Mock price data
const materialCategories = {
  โลหะ: [
    { id: "0101", name: "ทองแดง#1", price: 297.0 },
    { id: "0102", name: "ทองแดง#2", price: 286.0 },
    { id: "0103", name: "ทองแดง#3", price: 276.0 },
  ],
  เหล็ก: [
    { id: "0201", name: "เหล็กหนา(สั้น)", price: 9.8 },
    { id: "0202", name: "เหล็กหนา(ยาว)", price: 9.4 },
    { id: "0203", name: "เหล็กรวม", price: 9.4 },
  ],
  กระดาษ: [
    { id: "0301", name: "ดาษลังน้ำตาล", price: 4.2 },
    { id: "0302", name: "ดาษเศษ", price: 3.4 },
    { id: "0303", name: "ขาว-ดำ", price: 6.6 },
  ],
};

export const PricesTodayPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get all materials or filter by category
  const getMaterials = () => {
    let materials: {
      id: string;
      name: string;
      price: number;
      category: string;
    }[] = [];

    Object.entries(materialCategories).forEach(([category, items]) => {
      if (!activeCategory || activeCategory === category) {
        materials = [
          ...materials,
          ...items.map((item) => ({ ...item, category })),
        ];
      }
    });

    // Filter by search query
    if (searchQuery) {
      materials = materials.filter(
        (material) =>
          material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          material.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return materials;
  };

  const materials = getMaterials();

  return (
    <div className="min-h-screen bg-[#f0f5ee]">
      <OfficeSidebar />

      <div className="ml-64 p-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/office")}
          className="flex items-center text-[#2d6e7e] hover:text-[#1d5d6b] mb-4 transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>กลับไปหน้าหลัก</span>
        </button>

        <h1 className="text-4xl font-bold text-[#2d6e7e] mb-8 text-center">
          ราคาวันนี้
        </h1>

        <div className="max-w-4xl mx-auto">
          {/* Action buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button className="bg-[#2d6e7e] text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Printer size={18} />
              <span>พิมพ์</span>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Download size={18} />
              <span>ดาวน์โหลด</span>
            </button>
          </div>

          {/* Search and filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="ค้นหาวัสดุ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e7e]"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={activeCategory || ""}
              onChange={(e) => setActiveCategory(e.target.value || null)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e7e] bg-white"
            >
              <option value="">ทุกประเภท</option>
              {Object.keys(materialCategories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-[#2d6e7e] text-white flex items-center gap-2">
              <FileText size={20} />
              <h2 className="font-bold">
                ราคารับซื้อวัสดุ วันที่ 20 พฤศจิกายน 2567
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">รหัส</th>
                  <th className="py-3 px-4 text-left">ประเภท</th>
                  <th className="py-3 px-4 text-left">ชื่อวัสดุ</th>
                  <th className="py-3 px-4 text-right">ราคา (บาท/กก.)</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr
                    key={material.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{material.id}</td>
                    <td className="py-3 px-4">{material.category}</td>
                    <td className="py-3 px-4">{material.name}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {material.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
