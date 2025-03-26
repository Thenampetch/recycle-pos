"use client";

import type React from "react";
import { User } from "lucide-react";

// Bill interface
export interface Bill {
  invoiceID: string;
  date: string;
  time: string;
  memberID: string;
  memberName: string;
  memberImage?: string; // Optional, in case no image is provided
  status: "pending" | "paid";
  checktime?: string | null; // Optional, to indicate when the bill was paid
  items?: Array<{
    materialID: string;
    materialName: string;
    quantity: number;
    price: number;
    total: number;
    image?: string; // Optional image URL for each item
  }>;
}

interface BillCardProps {
  bill: Bill;
  onClick?: (bill: Bill) => void;
}

export const BillCard: React.FC<BillCardProps> = ({ bill, onClick }) => {
  const isClickable = onClick !== undefined;

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(bill);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${
        isClickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={`p-3 text-center font-medium ${
          bill.status === "paid" ? "bg-green-100" : "bg-[#b8d8d8]"
        }`}
      >
        <div className="flex justify-between items-center">
          <span>เลขที่: {bill.invoiceID}</span>
          {bill.status === "paid" && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              จ่ายแล้ว
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex gap-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          {bill.memberImage ? (
            <img
              src={bill.memberImage || "/placeholder.svg"}
              alt={bill.memberName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User  className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <div className="space-y-1">
            <p>วันที่: {bill.date}</p>
            <p>เวลา: {bill.time}</p>
            <p>รหัสสมาชิก: {bill.memberID}</p>
            <p>ชื่อ: {bill.memberName}</p>
            {bill.checktime && (
              <p>เวลาชำระ: {new Date(bill.checktime).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// "use client";

// import type React from "react";

// import { User } from "lucide-react";

// // Bill interface - this can be replaced with your API types later
// export interface Bill {
//   invoiceID: string;
//   date: string;
//   time: string;
//   memberID: string;
//   memberName: string;
//   memberImage: string;
//   status: "pending" | "paid";
  
// }

// // Mock data - replace this with API calls when backend is ready
// export const mockBills: Bill[] = [
//   {
//     invoiceID: "C1412297",
//     date: "20 พฤศจิกายน 2567",
//     time: "13:23 น.",
//     memberID: "0001",
//     memberName: "ลูกค้าทั่วไป",
//     memberImage: "/placeholder.svg",
//     status: "pending",
//   },
//   {
//     invoiceID: "C1412298",
//     date: "20 พฤศจิกายน 2567",
//     time: "13:23 น.",
//     memberID: "0002",
//     memberName: "สมชาย ใจดี",
//     memberImage: "/placeholder.svg",
//     status: "paid",
//   },
//   {
//     invoiceID: "C1412299",
//     date: "20 พฤศจิกายน 2567",
//     time: "13:23 น.",
//     memberID: "0003",
//     memberName: "สมหญิง รักษ์โลก",
//     memberImage: "/placeholder.svg",
//     status: "pending",
//   },
//   {
//     invoiceID: "C1412300",
//     date: "20 พฤศจิกายน 2567",
//     time: "13:23 น.",
//     memberID: "0001",
//     memberName: "ลูกค้าทั่วไป",
//     memberImage: "/placeholder.svg",
//     status: "paid",
//   },
//   {
//     invoiceID: "C1412301",
//     date: "20 พฤศจิกายน 2567",
//     time: "13:23 น.",
//     memberID: "0004",
//     memberName: "วิชัย รีไซเคิล",
//     memberImage: "/placeholder.svg",
//     status: "pending",
//   },
//   {
//     invoiceID: "C1412302",
//     date: "20 พฤศจิกายน 2567",
//     time: "13:23 น.",
//     memberID: "0005",
//     memberName: "นภา สะอาด",
//     memberImage: "/placeholder.svg",
//     status: "paid",
//   },
// ];

// // Function to update bill status - replace with API call when backend is ready
// export const updateBillStatus = (
//   billId: string,
//   newStatus: "pending" | "paid"
// ): void => {
//   const billIndex = mockBills.findIndex((bill) => bill.invoiceID === billId);
//   if (billIndex !== -1) {
//     mockBills[billIndex].status = newStatus;
//   }
// };

// interface BillCardProps {
//   bill: Bill;
//   onClick?: (bill: Bill) => void;
// }

// export const BillCard: React.FC<BillCardProps> = ({ bill, onClick }) => {
//   const isClickable = onClick !== undefined;

//   const handleClick = () => {
//     if (isClickable && onClick) {
//       onClick(bill);
//     }
//   };

//   return (
//     <div
//       className={`bg-white rounded-lg shadow-sm overflow-hidden ${
//         isClickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""
//       }`}
//       onClick={handleClick}
//     >
//       <div
//         className={`p-3 text-center font-medium ${
//           bill.status === "paid" ? "bg-green-100" : "bg-[#b8d8d8]"
//         }`}
//       >
//         <div className="flex justify-between items-center">
//           <span>เลขที่: {bill.invoiceID}</span>
//           {bill.status === "paid" && (
//             <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//               จ่ายแล้ว
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="p-4 flex gap-4">
//         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
//           {bill.memberImage ? (
//             <img
//               src={bill.memberImage || "/placeholder.svg"}
//               alt={bill.memberName}
//               className="w-full h-full rounded-full object-cover"
//             />
//           ) : (
//             <User className="w-12 h-12 text-gray-400" />
//           )}
//         </div>
//         <div className="flex-1">
//           <div className="space-y-1">
//             <p>วันที่: {bill.date}</p>
//             <p>เวลา: {bill.time}</p>
//             <p>รหัสสมาชิก: {bill.memberID}</p>
//             <p>ชื่อ: {bill.memberName}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
