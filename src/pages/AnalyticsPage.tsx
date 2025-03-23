"use client";

import type React from "react";
import { useState } from "react";
import { AnalyticsSidebar } from "../components/layout/analytics-sidebar";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Printer,
} from "lucide-react";
import { SalesChart } from "../components/analytics/SalesChart";
import { MaterialDistributionChart } from "../components/analytics/MaterialDistributionChart";
import { TopMaterialsTable } from "../components/analytics/TopMaterialsTable";
import { RecentTransactionsTable } from "../components/analytics/RecentTransactionsTable";

export const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for KPIs
  const kpiData = {
    totalRevenue: {
      value: 458750,
      change: 12.5,
      isPositive: true,
    },
    totalWeight: {
      value: 25680,
      change: 8.3,
      isPositive: true,
    },
    totalTransactions: {
      value: 1254,
      change: -3.2,
      isPositive: false,
    },
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleDownloadReport = () => {
    alert("กำลังดาวน์โหลดรายงาน...");
    // In a real app, this would trigger a report download
  };

  const handlePrintReport = () => {
    alert("กำลังเตรียมพิมพ์รายงาน...");
    // In a real app, this would open a print dialog
  };

  const handleFilterClick = () => {
    alert("เปิดตัวกรองข้อมูล");
    // In a real app, this would open a filter modal
  };

  const handleViewAllClick = (section: string) => {
    alert(`ดูข้อมูลทั้งหมดสำหรับ ${section}`);
    // In a real app, this would navigate to a detailed view
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsSidebar activePage="dashboard" />

      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#2d6e7e]">
            แดชบอร์ดวิเคราะห์ข้อมูล
          </h1>
          <div className="flex space-x-2">
            <select
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm cursor-pointer"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">ว��นนี้</option>
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
              onClick={handleFilterClick}
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
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center text-sm hover:bg-gray-50"
              onClick={handlePrintReport}
            >
              <Printer size={16} className="mr-2" />
              พิมพ์
            </button>
            <button
              className="bg-[#2d6e7e] text-white rounded-lg px-4 py-2 flex items-center text-sm hover:bg-[#1d5d6d]"
              onClick={handleDownloadReport}
            >
              <Download size={16} className="mr-2" />
              ดาวน์โหลด
            </button>
          </div>
        </div>

        {/* KPI Cards - Removed สมาชิกที่ใช้งาน as requested */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดรายได้")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">รายได้ทั้งหมด</p>
                <h3 className="text-2xl font-bold mt-1">
                  ฿{kpiData.totalRevenue.value.toLocaleString()}
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.totalRevenue.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.totalRevenue.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.totalRevenue.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="text-green-500" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดน้ำหนักวัสดุ")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">น้ำหนักรวม (กก.)</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.totalWeight.value.toLocaleString()}
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.totalWeight.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.totalWeight.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.totalWeight.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <ShoppingCart className="text-amber-500" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดธุรกรรม")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">ธุรกรรมทั้งหมด</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.totalTransactions.value.toLocaleString()}
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.totalTransactions.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.totalTransactions.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.totalTransactions.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="text-blue-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">แนวโน้มรายได้</h2>
              <div className="flex space-x-2">
                <select
                  className="text-sm border rounded p-1 cursor-pointer"
                  onChange={(e) => alert(`เปลี่ยนมุมมองเป็น ${e.target.value}`)}
                >
                  <option value="daily">รายวัน</option>
                  <option value="weekly">รายสัปดาห์</option>
                  <option value="monthly" selected>
                    รายเดือน
                  </option>
                </select>
                <button
                  className="text-[#2d6e7e] text-sm hover:underline"
                  onClick={() => handleViewAllClick("แนวโน้มรายได้")}
                >
                  ดูทั้งหมด
                </button>
              </div>
            </div>
            <SalesChart />
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">สัดส่วนประเภทวัสดุ</h2>
              <div className="flex space-x-2">
                <select
                  className="text-sm border rounded p-1 cursor-pointer"
                  onChange={(e) => alert(`เปลี่ยนมุมมองเป็น ${e.target.value}`)}
                >
                  <option value="weight">ตามน้ำหนัก</option>
                  <option value="value" selected>
                    ตามมูลค่า
                  </option>
                </select>
                <button
                  className="text-[#2d6e7e] text-sm hover:underline"
                  onClick={() => handleViewAllClick("สัดส่วนประเภทวัสดุ")}
                >
                  ดูทั้งหมด
                </button>
              </div>
            </div>
            <MaterialDistributionChart />
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">วัสดุยอดนิยม</h2>
              <button
                className="text-[#2d6e7e] text-sm hover:underline"
                onClick={() => handleViewAllClick("วัสดุยอดนิยม")}
              >
                ดูทั้งหมด
              </button>
            </div>
            <TopMaterialsTable />
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">ธุรกรรมล่าสุด</h2>
              <button
                className="text-[#2d6e7e] text-sm hover:underline"
                onClick={() => handleViewAllClick("ธุรกรรมล่าสุด")}
              >
                ดูทั้งหมด
              </button>
            </div>
            <RecentTransactionsTable />
          </div>
        </div>
      </div>
    </div>
  );
};
