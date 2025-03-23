// "use client";

// import { useState } from "react";
// import { OfficeSidebar } from "../components/layout/office-sidebar";
// import { BillCard, mockBills } from "../components/bills/billcard";
// import { Search } from "lucide-react";

// export const PendingBillsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter bills by status and search query
//   // When backend is ready, replace this with API call:
//   // const [pendingBills, setPendingBills] = useState([]);
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const data = await fetchBills('pending');
//   //     setPendingBills(data);
//   //   };
//   //   fetchData();
//   // }, []);
//   const pendingBills = mockBills.filter(
//     (bill) =>
//       bill.status === "pending" &&
//       (searchQuery
//         ? bill.id.toLowerCase().includes(searchQuery.toLowerCase())
//         : true)
//   );

//   return (
//     <div className="min-h-screen bg-[#f0f5ee]">
//       <OfficeSidebar />

//       <div className="ml-64 p-8">
//         <h1 className="text-4xl font-bold text-[#2d6e7e] mb-8 text-center">
//           บิลค้างจ่าย
//         </h1>

//         {/* Search Bar */}
//         <div className="max-w-2xl mx-auto mb-8 relative">
//           <input
//             type="text"
//             placeholder="ค้นหาเลขที่บิล"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e7e]"
//           />
//           <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>

//         {/* Bills Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//           {pendingBills.length > 0 ? (
//             pendingBills.map((bill) => <BillCard key={bill.id} bill={bill} />)
//           ) : (
//             <div className="col-span-2 text-center py-8 text-gray-500">
//               ไม่พบบิลค้างจ่าย
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OfficeSidebar } from "../components/layout/office-sidebar";
import {
  BillCard,
  mockBills,
  updateBillStatus,
} from "../components/bills/billcard";
import { CheckingBillModal } from "../components/bills/CheckingBillModal";
import { Search, ArrowLeft } from "lucide-react";
import type { Bill } from "../components/bills/billcard";

export const PendingBillsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const navigate = useNavigate();

  // Load bills on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setBills([...mockBills]);
  }, []);

  // Filter bills by status and search query
  const pendingBills = bills.filter(
    (bill) =>
      bill.status === "pending" &&
      (searchQuery
        ? bill.id.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  const handleBillClick = (bill: Bill) => {
    setSelectedBill(bill);
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
  };

  const handleCompleteBill = (billId: string) => {
    // Update the bill status in the mock data
    updateBillStatus(billId, "paid");

    // Update the local state to reflect the change
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.id === billId ? { ...bill, status: "paid" } : bill
      )
    );

    // Close the modal
    setSelectedBill(null);
  };

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
          บิลค้างจ่าย
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="ค้นหาเลขที่บิล"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e7e]"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Bills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {pendingBills.length > 0 ? (
            pendingBills.map((bill) => (
              <BillCard key={bill.id} bill={bill} onClick={handleBillClick} />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              ไม่พบบิลค้างจ่าย
            </div>
          )}
        </div>
      </div>

      {/* Checking Bill Modal */}
      {selectedBill && (
        <CheckingBillModal
          bill={selectedBill}
          onClose={handleCloseModal}
          onComplete={handleCompleteBill}
        />
      )}
    </div>
  );
};
