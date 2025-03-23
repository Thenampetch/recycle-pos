"use client";

import type React from "react";
import { useState } from "react";
import { Eye, ChevronUp, ChevronDown } from "lucide-react";

export const RecentTransactionsTable: React.FC = () => {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Mock data for recent transactions
  const recentTransactionsData = [
    {
      id: "C1412302",
      date: "20 พ.ย. 2567",
      time: "15:45 น.",
      memberName: "นภา สะอาด",
      memberCode: "0005",
      amount: 12580,
      status: "paid",
      items: [
        { name: "ทองแดง#1", weight: 2.5, price: 297, total: 742.5 },
        { name: "เหล็กหนา(สั้น)", weight: 1200, price: 9.8, total: 11760 },
        { name: "กระดาษลังน้ำตาล", weight: 18.5, price: 4.2, total: 77.7 },
      ],
    },
    {
      id: "C1412301",
      date: "20 พ.ย. 2567",
      time: "14:30 น.",
      memberName: "วิชัย รีไซเคิล",
      memberCode: "0004",
      amount: 8750,
      status: "pending",
      items: [
        { name: "ทองแดง#2", weight: 3.2, price: 286, total: 915.2 },
        { name: "เหล็กหนา(ยาว)", weight: 830, price: 9.4, total: 7802 },
        { name: "แก้ว", weight: 8.2, price: 4, total: 32.8 },
      ],
    },
    {
      id: "C1412300",
      date: "20 พ.ย. 2567",
      time: "13:15 น.",
      memberName: "ลูกค้าทั่วไป",
      memberCode: "0001",
      amount: 3240,
      status: "paid",
      items: [{ name: "เหล็กรวม", weight: 345, price: 9.4, total: 3243 }],
    },
    {
      id: "C1412299",
      date: "20 พ.ย. 2567",
      time: "11:50 น.",
      memberName: "สมหญิง รักษ์โลก",
      memberCode: "0003",
      amount: 5680,
      status: "pending",
      items: [
        { name: "ทองแดง#1", weight: 1.8, price: 297, total: 534.6 },
        { name: "กระดาษลังน้ำตาล", weight: 1225, price: 4.2, total: 5145 },
      ],
    },
    {
      id: "C1412298",
      date: "20 พ.ย. 2567",
      time: "10:25 น.",
      memberName: "สมชาย ใจดี",
      memberCode: "0002",
      amount: 9340,
      status: "paid",
      items: [
        { name: "ทองแดง#2", weight: 2.1, price: 286, total: 600.6 },
        { name: "เหล็กหนา(สั้น)", weight: 890, price: 9.8, total: 8722 },
        { name: "แก้ว", weight: 4.2, price: 4, total: 16.8 },
      ],
    },
  ];

  // Sort the data based on current sort field and direction
  const sortedTransactions = [...recentTransactionsData].sort((a, b) => {
    if (sortField === "date") {
      // For date sorting, we need to consider both date and time
      const dateTimeA = `${a.date} ${a.time}`;
      const dateTimeB = `${b.date} ${b.time}`;
      return sortDirection === "asc"
        ? dateTimeA.localeCompare(dateTimeB)
        : dateTimeB.localeCompare(dateTimeA);
    }

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

  const handleViewTransaction = (transaction: any) => {
    alert(`ดูรายละเอียดบิล ${transaction.id} ของ ${transaction.memberName}`);
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
                เลขที่บิล
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
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                วันที่/เวลา
                {sortField === "date" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
            <th
              className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("memberName")}
            >
              <div className="flex items-center">
                ลูกค้า
                {sortField === "memberName" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  ))}
              </div>
            </th>
            <th
              className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("amount")}
            >
              <div className="flex items-center justify-end">
                จำนวนเงิน
                {sortField === "amount" &&
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
              ดูรายละเอียด
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => (
            <tr
              key={transaction.id}
              className={
                index !== sortedTransactions.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }
            >
              <td className="py-3 px-3 text-sm font-medium">
                {transaction.id}
              </td>
              <td className="py-3 px-3 text-sm">
                <div>{transaction.date}</div>
                <div className="text-xs text-gray-500">{transaction.time}</div>
              </td>
              <td className="py-3 px-3 text-sm">
                <div>{transaction.memberName}</div>
                <div className="text-xs text-gray-500">
                  รหัส: {transaction.memberCode}
                </div>
              </td>
              <td className="py-3 px-3 text-sm text-right font-medium">
                ฿{transaction.amount.toLocaleString()}
              </td>
              <td className="py-3 px-3 text-sm text-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    transaction.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status === "paid" ? "จ่ายแล้ว" : "ค้างจ่าย"}
                </span>
              </td>
              <td className="py-3 px-3 text-sm text-center">
                <button
                  className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                  onClick={() => handleViewTransaction(transaction)}
                  title="ดูรายละเอียด"
                >
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
