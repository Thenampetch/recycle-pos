"use client";

import type React from "react";
import { useState } from "react";
import { AnalyticsSidebar } from "../components/layout/analytics-sidebar";
import {
  Users,
  UserPlus,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Search,
  ChevronUp,
  ChevronDown,
  Eye,
} from "lucide-react";

export const MembersAnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("transactions");
  const [sortDirection, setSortDirection] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for members KPIs
  const kpiData = {
    totalMembers: {
      value: 342,
      change: 5.7,
      isPositive: true,
    },
    newMembers: {
      value: 28,
      change: 12.0,
      isPositive: true,
    },
    activeMembers: {
      value: 215,
      change: 3.5,
      isPositive: true,
    },
  };

  // Mock data for members
  const membersData = [
    {
      id: "0001",
      name: "ลูกค้าทั่วไป",
      phone: "-",
      joinDate: "-",
      transactions: 245,
      totalSpent: 125680,
      status: "active",
      lastVisit: "20 พ.ย. 2567",
    },
    {
      id: "0002",
      name: "สมชาย ใจดี",
      phone: "081-234-5678",
      joinDate: "15 ม.ค. 2567",
      transactions: 32,
      totalSpent: 45780,
      status: "active",
      lastVisit: "20 พ.ย. 2567",
    },
    {
      id: "0003",
      name: "สมหญิง รักษ์โลก",
      phone: "089-876-5432",
      joinDate: "22 ก.พ. 2567",
      transactions: 28,
      totalSpent: 38950,
      status: "active",
      lastVisit: "20 พ.ย. 2567",
    },
    {
      id: "0004",
      name: "วิชัย รีไซเคิล",
      phone: "062-345-6789",
      joinDate: "10 มี.ค. 2567",
      transactions: 15,
      totalSpent: 22450,
      status: "active",
      lastVisit: "20 พ.ย. 2567",
    },
    {
      id: "0005",
      name: "นภา สะอาด",
      phone: "095-678-1234",
      joinDate: "5 เม.ย. 2567",
      transactions: 12,
      totalSpent: 18750,
      status: "active",
      lastVisit: "20 พ.ย. 2567",
    },
    {
      id: "0006",
      name: "ประสิทธิ์ ขยัน",
      phone: "084-567-8901",
      joinDate: "18 พ.ค. 2567",
      transactions: 8,
      totalSpent: 12340,
      status: "inactive",
      lastVisit: "15 ต.ค. 2567",
    },
    {
      id: "0007",
      name: "มานี มีทรัพย์",
      phone: "091-234-5678",
      joinDate: "30 มิ.ย. 2567",
      transactions: 5,
      totalSpent: 8750,
      status: "inactive",
      lastVisit: "5 ต.ค. 2567",
    },
    {
      id: "0008",
      name: "สมศักดิ์ ศรีสุข",
      phone: "087-654-3210",
      joinDate: "12 ก.ค. 2567",
      transactions: 3,
      totalSpent: 4560,
      status: "inactive",
      lastVisit: "28 ก.ย. 2567",
    },
  ];

  // Filter and sort members
  const filteredMembers = membersData
    .filter((member) => {
      // Filter by search query
      if (
        searchQuery &&
        !member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !member.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !member.phone.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by status
      if (statusFilter !== "all" && member.status !== statusFilter) {
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

  const handleMemberClick = (member: any) => {
    alert(`ดูรายละเอียดของสมาชิก ${member.name} (${member.id})`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsSidebar activePage="members" />

      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#2d6e7e]">
            วิเคราะห์ข้อมูลสมาชิก
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
            className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดสมาชิกทั้งหมด")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">สมาชิกทั้งหมด</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.totalMembers.value} คน
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.totalMembers.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.totalMembers.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.totalMembers.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="text-purple-500" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดสมาชิกใหม่")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">สมาชิกใหม่</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.newMembers.value} คน
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.newMembers.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.newMembers.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.newMembers.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <UserPlus className="text-blue-500" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert("ดูรายละเอียดสมาชิกที่ใช้งาน")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">สมาชิกที่ใช้งาน</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.activeMembers.value} คน
                </h3>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    kpiData.activeMembers.isPositive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {kpiData.activeMembers.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {kpiData.activeMembers.change}% จากช่วงก่อนหน้า
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserCheck className="text-green-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">รายชื่อสมาชิก</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาสมาชิก..."
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e7e]"
              >
                <option value="all">ทุกสถานะ</option>
                <option value="active">ใช้งาน</option>
                <option value="inactive">ไม่ได้ใช้งาน</option>
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
                      รหัสสมาชิก
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
                      ชื่อสมาชิก
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
                    onClick={() => handleSort("phone")}
                  >
                    <div className="flex items-center">
                      เบอร์โทรศัพท์
                      {sortField === "phone" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} className="ml-1" />
                        ) : (
                          <ChevronDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("joinDate")}
                  >
                    <div className="flex items-center">
                      วันที่สมัคร
                      {sortField === "joinDate" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} className="ml-1" />
                        ) : (
                          <ChevronDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("transactions")}
                  >
                    <div className="flex items-center justify-end">
                      จำนวนธุรกรรม
                      {sortField === "transactions" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} className="ml-1" />
                        ) : (
                          <ChevronDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("totalSpent")}
                  >
                    <div className="flex items-center justify-end">
                      ยอดรวม
                      {sortField === "totalSpent" &&
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
                  <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ดูข้อมูล
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    className={`${
                      index !== filteredMembers.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } hover:bg-gray-50`}
                  >
                    <td className="py-3 px-3 text-sm">{member.id}</td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {member.name}
                    </td>
                    <td className="py-3 px-3 text-sm">{member.phone}</td>
                    <td className="py-3 px-3 text-sm">{member.joinDate}</td>
                    <td className="py-3 px-3 text-sm text-right">
                      {member.transactions}
                    </td>
                    <td className="py-3 px-3 text-sm text-right font-medium">
                      ฿{member.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-sm text-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          member.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.status === "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-center">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                        onClick={() => handleMemberClick(member)}
                        title="ดูข้อมูลสมาชิก"
                      >
                        <Eye size={18} />
                      </button>
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
