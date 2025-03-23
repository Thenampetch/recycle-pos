"use client";

import type React from "react";
import { useState } from "react";
import { TrendingUp, TrendingDown, ChevronUp, ChevronDown } from "lucide-react";

export const TopMaterialsTable: React.FC = () => {
  const [sortField, setSortField] = useState("revenue");
  const [sortDirection, setSortDirection] = useState("desc");

  // Mock data for top materials
  const topMaterialsData = [
    {
      id: "0101",
      name: "ทองแดง#1",
      category: "โลหะ",
      weight: 1250,
      revenue: 371250,
      change: 12.5,
      isPositive: true,
      price: 297,
    },
    {
      id: "0102",
      name: "ทองแดง#2",
      category: "โลหะ",
      weight: 980,
      revenue: 280280,
      change: 8.3,
      isPositive: true,
      price: 286,
    },
    {
      id: "0201",
      name: "เหล็กหนา(สั้น)",
      category: "เหล็ก",
      weight: 5600,
      revenue: 54880,
      change: -3.2,
      isPositive: false,
      price: 9.8,
    },
    {
      id: "0202",
      name: "เหล็กหนา(ยาว)",
      category: "เหล็ก",
      weight: 4800,
      revenue: 45120,
      change: 5.7,
      isPositive: true,
      price: 9.4,
    },
    {
      id: "0301",
      name: "กระดาษลังน้ำตาล",
      category: "กระดาษ",
      weight: 3200,
      revenue: 13440,
      change: 15.2,
      isPositive: true,
      price: 4.2,
    },
  ];

  // Sort the data based on current sort field and direction
  const sortedMaterials = [...topMaterialsData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    // For string values
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleRowClick = (material: any) => {
    alert(`ดูรายละเอียดของ ${material.name} (${material.id})`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th
              className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                รหัส
                {sortField === "id" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
            <th
              className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                ชื่อวัสดุ
                {sortField === "name" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
            <th
              className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("category")}
            >
              <div className="flex items-center">
                ประเภท
                {sortField === "category" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
            <th
              className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("weight")}
            >
              <div className="flex items-center justify-end">
                น้ำหนัก (กก.)
                {sortField === "weight" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
            <th
              className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("revenue")}
            >
              <div className="flex items-center justify-end">
                รายได้ (บาท)
                {sortField === "revenue" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
            <th
              className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("change")}
            >
              <div className="flex items-center justify-end">
                เปลี่ยนแปลง
                {sortField === "change" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMaterials.map((material, index) => (
            <tr
              key={material.id}
              className={`${
                index !== sortedMaterials.length - 1
                  ? "border-b border-gray-100"
                  : ""
              } hover:bg-gray-50 cursor-pointer`}
              onClick={() => handleRowClick(material)}
            >
              <td className="py-3 px-3 text-sm">{material.id}</td>
              <td className="py-3 px-3 text-sm font-medium">{material.name}</td>
              <td className="py-3 px-3 text-sm">{material.category}</td>
              <td className="py-3 px-3 text-sm text-right">
                {material.weight.toLocaleString()}
              </td>
              <td className="py-3 px-3 text-sm text-right font-medium">
                {material.revenue.toLocaleString()}
              </td>
              <td className="py-3 px-3 text-sm text-right">
                <span
                  className={`flex items-center justify-end ${
                    material.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {material.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {material.change}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
