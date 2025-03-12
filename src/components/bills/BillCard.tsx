import type React from "react";
import { User } from "lucide-react";

// Bill interface - this can be replaced with your API types later
export interface Bill {
  id: string;
  date: string;
  time: string;
  memberCode: string;
  memberName: string;
  memberImage: string;
  status: "pending" | "paid";
}

// Mock data - replace this with API calls when backend is ready
export const mockBills: Bill[] = [
  {
    id: "C1412297",
    date: "20 พฤศจิกายน 2567",
    time: "13:23 น.",
    memberCode: "0001",
    memberName: "ลูกค้าทั่วไป",
    memberImage: "/placeholder.svg",
    status: "pending",
  },
  {
    id: "C1412298",
    date: "20 พฤศจิกายน 2567",
    time: "13:23 น.",
    memberCode: "0002",
    memberName: "สมชาย ใจดี",
    memberImage: "/placeholder.svg",
    status: "paid",
  },
  {
    id: "C1412299",
    date: "20 พฤศจิกายน 2567",
    time: "13:23 น.",
    memberCode: "0003",
    memberName: "สมหญิง รักษ์โลก",
    memberImage: "/placeholder.svg",
    status: "pending",
  },
  {
    id: "C1412300",
    date: "20 พฤศจิกายน 2567",
    time: "13:23 น.",
    memberCode: "0001",
    memberName: "ลูกค้าทั่วไป",
    memberImage: "/placeholder.svg",
    status: "paid",
  },
  {
    id: "C1412301",
    date: "20 พฤศจิกายน 2567",
    time: "13:23 น.",
    memberCode: "0004",
    memberName: "วิชัย รีไซเคิล",
    memberImage: "/placeholder.svg",
    status: "pending",
  },
  {
    id: "C1412302",
    date: "20 พฤศจิกายน 2567",
    time: "13:23 น.",
    memberCode: "0005",
    memberName: "นภา สะอาด",
    memberImage: "/placeholder.svg",
    status: "paid",
  },
];

// API function placeholder - implement this when backend is ready
// export const fetchBills = async (status: 'pending' | 'paid'): Promise<Bill[]> => {
//   const response = await fetch(`/api/bills?status=${status}`);
//   const data = await response.json();
//   return data;
// };

interface BillCardProps {
  bill: Bill;
}

export const BillCard: React.FC<BillCardProps> = ({ bill }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#b8d8d8] p-3 text-center font-bold">
        เลขที่: {bill.id}
      </div>
      <div className="p-4 flex gap-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          {bill.memberImage ? (
            <img
              src={bill.memberImage || "/placeholder.svg"}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <div className="space-y-1">
            <p>วันที่: {bill.date}</p>
            <p>เวลา: {bill.time}</p>
            <p>รหัสสมาชิก: {bill.memberCode}</p>
            <p>ชื่อ: {bill.memberName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
