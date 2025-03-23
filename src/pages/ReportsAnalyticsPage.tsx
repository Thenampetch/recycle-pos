"use client";

import type React from "react";
import { useState } from "react";
import { AnalyticsSidebar } from "../components/layout/analytics-sidebar";
import {
  FileText,
  BarChart4,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Printer,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

export const ReportsAnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for available reports
  const availableReports = [
    {
      id: "sales-summary",
      name: "รายงานสรุปยอดขาย",
      description: "สรุปยอดขายทั้งหมดตามช่วงเวลาที่เลือก แยกตามประเภทสินค้า",
      icon: <BarChart4 size={24} />,
      lastGenerated: "20 พ.ย. 2567, 08:30 น.",
      category: "sales",
    },
    {
      id: "material-distribution",
      name: "รายงานสัดส่วนวัสดุ",
      description:
        "แสดงสัดส่วนของวัสดุแต่ละประเภทที่รับซื้อ ทั้งตามน้ำหนักและมูลค่า",
      icon: <PieChart size={24} />,
      lastGenerated: "20 พ.ย. 2567, 08:35 น.",
      category: "inventory",
    },
    {
      id: "price-trends",
      name: "รายงานแนวโน้มราคา",
      description: "แสดงการเปลี่ยนแปลงของราคาวัสดุแต่ละประเภทตามช่วงเวลา",
      icon: <LineChart size={24} />,
      lastGenerated: "20 พ.ย. 2567, 08:40 น.",
      category: "pricing",
    },
    {
      id: "member-activity",
      name: "รายงานกิจกรรมสมาชิก",
      description: "แสดงข้อมูลการทำธุรกรรมของสมาชิกแต่ละราย ความถี่ และมูลค่า",
      icon: <BarChart4 size={24} />,
      lastGenerated: "20 พ.ย. 2567, 08:45 น.",
      category: "members",
    },
    {
      id: "inventory-status",
      name: "รายงานสถานะสินค้าคงคลัง",
      description: "แสดงปริมาณและมูลค่าของสินค้าคงคลังทั้งหมด แยกตามประเภท",
      icon: <BarChart4 size={24} />,
      lastGenerated: "20 พ.ย. 2567, 08:50 น.",
      category: "inventory",
    },
    {
      id: "financial-summary",
      name: "รายงานสรุปการเงิน",
      description: "สรุปรายรับ รายจ่าย และกำไรตามช่วงเวลาที่เลือก",
      icon: <LineChart size={24} />,
      lastGenerated: "20 พ.ย. 2567, 08:55 น.",
      category: "financial",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleGenerateReport = (reportId: string) => {
    alert(`กำลังสร้างรายงาน ${reportId}...`);
  };

  const handleViewReport = (reportId: string) => {
    alert(`กำลังเปิดรายงาน ${reportId}...`);
  };

  const handlePrintReport = (reportId: string) => {
    alert(`กำลังพิมพ์รายงาน ${reportId}...`);
  };

  const handleDownloadReport = (reportId: string) => {
    alert(`กำลังดาวน์โหลดรายงาน ${reportId}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsSidebar activePage="reports" />

      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#2d6e7e]">รายงานวิเคราะห์</h1>
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
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                size={16}
                className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "กำลังโหลด..." : "รีเฟรช"}
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="bg-[#2d6e7e] p-3 rounded-lg text-white mr-4">
                  {report.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{report.name}</h3>
                  <p className="text-gray-500 text-sm">{report.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div>
                  <span>สร้างล่าสุด: </span>
                  <span>{report.lastGenerated}</span>
                </div>
                <div className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {report.category === "sales" && "ยอดขาย"}
                  {report.category === "inventory" && "สินค้าคงคลัง"}
                  {report.category === "pricing" && "ราคา"}
                  {report.category === "members" && "สมาชิก"}
                  {report.category === "financial" && "การเงิน"}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="text-[#2d6e7e] hover:text-[#1d5d6d] flex items-center text-sm"
                  onClick={() => handleViewReport(report.id)}
                >
                  ดูรายงาน
                  <ChevronRight size={16} className="ml-1" />
                </button>

                <div className="flex space-x-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                    onClick={() => handleGenerateReport(report.id)}
                    title="สร้างรายงานใหม่"
                  >
                    <FileText size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                    onClick={() => handlePrintReport(report.id)}
                    title="พิมพ์รายงาน"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                    onClick={() => handleDownloadReport(report.id)}
                    title="ดาวน์โหลดรายงาน"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
