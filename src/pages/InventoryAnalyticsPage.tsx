"use client";

import type React from "react";
import { useState } from "react";
import { AnalyticsSidebar } from "../components/layout/analytics-sidebar";
import {
  Package,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Search,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

export const InventoryAnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("stock");
  const [sortDirection, setSortDirection] = useState("desc");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for inventory KPIs
  const kpiData = {
    totalStock: {
      value: 25680,
      change: 8.3,
      isPositive: true,
    },
    totalValue: {
      value: 1250000,
      change: 12.5,
      isPositive: true,
    },
    lowStockItems: {
      value: 5,
      change: -2,
      isPositive: false,
    },
  };

  // Mock data for inventory items
  const inventoryItems = [
    {
      id: "0101",
      name: "ทองแดง#1",
      category: "โลหะ",
      stock: 1250,
      value: 371250,
      change: 12.5,
      isPositive: true,
      price: 297,
      status: "normal",
    },
    {
      id: "0102",
      name: "ทองแดง#2",
      category: "โลหะ",
      stock: 980,
      value: 280280,
      change: 8.3,
      isPositive: true,
      price: 286,
      status: "normal",
    },
    {
      id: "0201",
      name: "เหล็กหนา(สั้น)",
      category: "เหล็ก",
      stock: 5600,
      value: 54880,
      change: -3.2,
      isPositive: false,
      price: 9.8,
      status: "normal",
    },
    {
      id: "0202",
      name: "เหล็กหนา(ยาว)",
      category: "เหล็ก",
      stock: 120,
      value: 1128,
      change: -15.7,
      isPositive: false,
      price: 9.4,
      status: "low",
    },
    {
      id: "0301",
      name: "กระดาษลังน้ำตาล",
      category: "กระดาษ",
      stock: 3200,
      value: 13440,
      change: 15.2,
      isPositive: true,
      price: 4.2,
      status: "normal",
    },
    {
      id: "0302",
      name: "กระดาษเศษ",
      category: "กระดาษ",
      stock: 80,
      value: 272,
      change: -25.0,
      isPositive: false,
      price: 3.4,
      status: "low",
    },
    {
      id: "0401",
      name: "แก้วใส",
      category: "แก้ว",
      stock: 450,
      value: 1800,
      change: 5.0,
      isPositive: true,
      price: 4.0,
      status: "normal",
    },
    {
      id: "0501",
      name: "แบตเตอรี่รถยนต์",
      category: "แบตเตอรี่",
      stock: 75,
      value: 3750,
      change: -10.0,
      isPositive: false,
      price: 50.0,
      status: "low",
    },
  ];

  // Filter and sort inventory items
  const filteredItems = inventoryItems
    .filter((item) => {
      // Filter by search query
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by category
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(inventoryItems.map((item) => item.category)),
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleItemClick = (item: any) => {
    alert(`ดูรายละเอียดของ ${item.name} (${item.id})`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsSidebar activePage="inventory" />

      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#2d6e7e]">
            วิเคราะห์สินค้าคงคลัง
          </h1>
          <div className="flex space-x-2">
            <select
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm cursor-pointer"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">วันนี้</option>
              <option value="week">7 วันล่าสุด</option>
              <option value="month">30 วันล่าสุด</option>
              <option value="quarter">ไตรมาสนี้</option>
              <option value="year">ปีนี้</option>
            </select>
            <button
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center text-sm hover:bg-gray-50"
              onClick={() => alert("เลือกช่วงเวลาแบบกำหนดเอง")}
            >
              <Calendar size={16} className="mr-2" />
              กำหนดเอง
            </button>
            <button
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center text-sm hover:bg-gray-50"
              onClick={() => alert("เปิดตัวกรองข้อมูล")}
            >
              <Filter size={16} className="mr-2" />
              ตัวกรอง
            </button>
            <button
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center text-sm hover:bg-gray-50"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                size={16}
                className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "กำลังโหลด..." : "รีเฟรช"}
            </button>
            <button
              className="bg-[#2d6e7e] text-white rounded-lg px-4 py-2 flex items-center text-sm hover:bg-[#1d5d6d]"
              onClick={() => alert("กำลังดาวน์โหลดรายงาน...")}
            >
              <Download size={16} className="mr-2" />
              ดาวน์โหลด
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดสินค้าคงคลัง")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">
                  สินค้าคงคลังทั้งหมด (กก.)
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.totalStock.value.toLocaleString()}
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.totalStock.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.totalStock.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.totalStock.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="text-blue-500" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดมูลค่าสินค้า")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">มูลค่าสินค้าคงคลัง</p>
                <h3 className="text-2xl font-bold mt-1">
                  ฿{kpiData.totalValue.value.toLocaleString()}
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.totalValue.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.totalValue.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.totalValue.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ArrowUpDown className="text-green-500" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายการสินค้าที่ใกล้หมด")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">สินค้าใกล้หมด</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.lowStockItems.value} รายการ
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.lowStockItems.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.lowStockItems.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {Math.abs(kpiData.lowStockItems.change)} รายการ
                  จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle className="text-amber-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">รายการสินค้าคงคลัง</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e7e]"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={14}
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e7e]"
              >
                <option value="all">ทุกประเภท</option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
          </div>

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
                      ชื่อสินค้า
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
                    onClick={() => handleSort("stock")}
                  >
                    <div className="flex items-center justify-end">
                      คงเหลือ (กก.)
                      {sortField === "stock" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} className="ml-1" />
                        ) : (
                          <ChevronDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center justify-end">
                      ราคา/หน่วย
                      {sortField === "price" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} className="ml-1" />
                        ) : (
                          <ChevronDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("value")}
                  >
                    <div className="flex items-center justify-end">
                      มูลค่ารวม
                      {sortField === "value" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} className="ml-1" />
                        ) : (
                          <ChevronDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center justify-center">
                      สถานะ
                      {sortField === "status" &&
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
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index !== filteredItems.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } hover:bg-gray-50 cursor-pointer`}
                    onClick={() => handleItemClick(item)}
                  >
                    <td className="py-3 px-3 text-sm">{item.id}</td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {item.name}
                    </td>
                    <td className="py-3 px-3 text-sm">{item.category}</td>
                    <td className="py-3 px-3 text-sm text-right">
                      {item.stock.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-sm text-right">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-sm text-right font-medium">
                      {item.value.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-sm text-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "normal"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status === "normal" ? "ปกติ" : "ใกล้หมด"}
                      </span>
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
