"use client";

import type React from "react";
import { useState } from "react";
import { AnalyticsSidebar } from "../components/layout/analytics-sidebar";
import {
  Settings,
  Bell,
  Database,
  FileText,
  Save,
  RefreshCw,
} from "lucide-react";

export const SettingsAnalyticsPage: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Mock settings data
  const [generalSettings, setGeneralSettings] = useState({
    autoRefresh: true,
    refreshInterval: "30",
    defaultDateRange: "month",
    defaultView: "dashboard",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlert: true,
    lowStockThreshold: "150",
    priceChangeAlert: true,
    memberActivityAlert: false,
    dailySummary: true,
    weeklySummary: true,
  });

  const [dataSettings, setDataSettings] = useState({
    dataRetentionPeriod: "365",
    backupFrequency: "daily",
    backupTime: "00:00",
    autoCleanup: true,
  });

  const [reportSettings, setReportSettings] = useState({
    autoGenerateReports: true,
    reportFormat: "pdf",
    includeCharts: true,
    includeTables: true,
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleSaveSettings = () => {
    alert("บันทึกการตั้งค่าเรียบร้อยแล้ว");
  };

  const handleGeneralSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setGeneralSettings({
      ...generalSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNotificationSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setNotificationSettings({
      ...notificationSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDataSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setDataSettings({
      ...dataSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReportSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setReportSettings({
      ...reportSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsSidebar activePage="settings" />

      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#2d6e7e]">
            ตั้งค่าระบบวิเคราะห์
          </h1>
          <div className="flex space-x-2">
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
              onClick={handleSaveSettings}
            >
              <Save size={16} className="mr-2" />
              บันทึกการตั้งค่า
            </button>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "general"
                  ? "border-b-2 border-[#2d6e7e] text-[#2d6e7e]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("general")}
            >
              <Settings size={16} className="inline mr-2" />
              ทั่วไป
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "notifications"
                  ? "border-b-2 border-[#2d6e7e] text-[#2d6e7e]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell size={16} className="inline mr-2" />
              การแจ้งเตือน
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "data"
                  ? "border-b-2 border-[#2d6e7e] text-[#2d6e7e]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("data")}
            >
              <Database size={16} className="inline mr-2" />
              ข้อมูล
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "reports"
                  ? "border-b-2 border-[#2d6e7e] text-[#2d6e7e]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              <FileText size={16} className="inline mr-2" />
              รายงาน
            </button>
          </div>

          {/* General Settings */}
          {activeTab === "general" && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">การตั้งค่าทั่วไป</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="autoRefresh"
                        checked={generalSettings.autoRefresh}
                        onChange={handleGeneralSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>รีเฟรชข้อมูลอัตโนมัติ</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ช่วงเวลารีเฟรช (นาที)
                    </label>
                    <select
                      name="refreshInterval"
                      value={generalSettings.refreshInterval}
                      onChange={handleGeneralSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                      disabled={!generalSettings.autoRefresh}
                    >
                      <option value="5">5 นาที</option>
                      <option value="15">15 นาที</option>
                      <option value="30">30 นาที</option>
                      <option value="60">1 ชั่วโมง</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ช่วงเวลาเริ่มต้น
                    </label>
                    <select
                      name="defaultDateRange"
                      value={generalSettings.defaultDateRange}
                      onChange={handleGeneralSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                    >
                      <option value="today">วันนี้</option>
                      <option value="week">7 วันล่าสุด</option>
                      <option value="month">30 วันล่าสุด</option>
                      <option value="quarter">ไตรมาสนี้</option>
                      <option value="year">ปีนี้</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หน้าเริ่มต้น
                    </label>
                    <select
                      name="defaultView"
                      value={generalSettings.defaultView}
                      onChange={handleGeneralSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                    >
                      <option value="dashboard">แดชบอร์ด</option>
                      <option value="inventory">สินค้าคงคลัง</option>
                      <option value="members">สมาชิก</option>
                      <option value="reports">รายงาน</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">
                การตั้งค่าการแจ้งเตือน
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="lowStockAlert"
                        checked={notificationSettings.lowStockAlert}
                        onChange={handleNotificationSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>แจ้งเตือนเมื่อสินค้าใกล้หมด</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เกณฑ์สินค้าใกล้หมด (กก.)
                    </label>
                    <input
                      type="number"
                      name="lowStockThreshold"
                      value={notificationSettings.lowStockThreshold}
                      onChange={handleNotificationSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                      disabled={!notificationSettings.lowStockAlert}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="priceChangeAlert"
                        checked={notificationSettings.priceChangeAlert}
                        onChange={handleNotificationSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>แจ้งเตือนเมื่อราคาเปลี่ยนแปลง</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="memberActivityAlert"
                        checked={notificationSettings.memberActivityAlert}
                        onChange={handleNotificationSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>แจ้งเตือนกิจกรรมสมาชิก</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="dailySummary"
                        checked={notificationSettings.dailySummary}
                        onChange={handleNotificationSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>สรุปรายวัน</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="weeklySummary"
                        checked={notificationSettings.weeklySummary}
                        onChange={handleNotificationSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>สรุปรายสัปดาห์</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Settings */}
          {activeTab === "data" && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">การตั้งค่าข้อมูล</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ระยะเวลาเก็บข้อมูล (วัน)
                    </label>
                    <input
                      type="number"
                      name="dataRetentionPeriod"
                      value={dataSettings.dataRetentionPeriod}
                      onChange={handleDataSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ความถี่ในการสำรองข้อมูล
                    </label>
                    <select
                      name="backupFrequency"
                      value={dataSettings.backupFrequency}
                      onChange={handleDataSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                    >
                      <option value="daily">รายวัน</option>
                      <option value="weekly">รายสัปดาห์</option>
                      <option value="monthly">รายเดือน</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เวลาสำรองข้อมูล
                    </label>
                    <input
                      type="time"
                      name="backupTime"
                      value={dataSettings.backupTime}
                      onChange={handleDataSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="autoCleanup"
                        checked={dataSettings.autoCleanup}
                        onChange={handleDataSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>ล้างข้อมูลเก่าอัตโนมัติ</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Report Settings */}
          {activeTab === "reports" && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">การตั้งค่ารายงาน</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="autoGenerateReports"
                        checked={reportSettings.autoGenerateReports}
                        onChange={handleReportSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>สร้างรายงานอัตโนมัติ</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      รูปแบบรายงาน
                    </label>
                    <select
                      name="reportFormat"
                      value={reportSettings.reportFormat}
                      onChange={handleReportSettingChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2d6e7e] focus:ring focus:ring-[#2d6e7e] focus:ring-opacity-50"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="includeCharts"
                        checked={reportSettings.includeCharts}
                        onChange={handleReportSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>รวมแผนภูมิในรายงาน</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="includeTables"
                        checked={reportSettings.includeTables}
                        onChange={handleReportSettingChange}
                        className="rounded border-gray-300 text-[#2d6e7e] focus:ring-[#2d6e7e] mr-2"
                      />
                      <span>รวมตารางข้อมูลในรายงาน</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
