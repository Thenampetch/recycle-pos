"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OfficeSidebar } from "../components/layout/office-sidebar";
import { BillCard } from "../components/bills/BillCard";
import { CheckingBillModal } from "../components/bills/CheckingBillModal";
import { Search, ArrowLeft } from "lucide-react";
import type { Bill } from "../components/bills/BillCard";
import axios from "axios";

export const PendingBillsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const navigate = useNavigate();

  // Load bills on component mount
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoices");
        const pendingBills = response.data.filter((bill: Bill) => bill.status === "pending");
        setBills(pendingBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const handleBillClick = (bill: Bill) => {
    setSelectedBill(bill);
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
  };

  const handleCompleteBill = async (billId: string) => {
    // Update the bill status in the backend
    await axios.put(`http://localhost:3000/invoices/${billId}`, { status: "paid", checktime: new Date() });

    // Refresh the bills
    const response = await axios.get("http://localhost:3000/invoices");
    const pendingBills = response.data.filter((bill: Bill) => bill.status === "pending");
    setBills(pendingBills);

    // Close the modal
    setSelectedBill(null);
  };

  return (
    <div className="min-h-screen bg-[#f0f5ee]">
      <OfficeSidebar />

      <div className="ml-64 p-8">
        <button onClick={() => navigate("/office")} className="flex items-center text-[#2d6e7e] hover:text-[#1d5d6b] mb-4 transition-colors">
          <ArrowLeft size={20} className="mr-1" />
          <span>กลับไปหน้าหลัก</span>
        </button>

        <h1 className="text-4xl font-bold text-[#2d6e7e] mb-8 text-center">บิลค้างจ่าย</h1>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {bills.length > 0 ? (
            bills.map((bill) => (
              <BillCard key={bill.invoiceID} bill={bill} onClick={handleBillClick} />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">ไม่พบบิลค้างจ่าย</div>
          )}
        </div>
      </div>

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



// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { OfficeSidebar } from "../components/layout/office-sidebar";
// import {
//   BillCard,
//   mockBills,
//   updateBillStatus,
// } from "../components/bills/BillCard";
// import { CheckingBillModal } from "../components/bills/CheckingBillModal";
// import { Search, ArrowLeft } from "lucide-react";
// import type { Bill } from "../components/bills/BillCard";

// export const PendingBillsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
//   const [bills, setBills] = useState<Bill[]>([]);
//   const navigate = useNavigate();

//   // Load bills on component mount
//   useEffect(() => {
//     // In a real app, this would be an API call
//     setBills([...mockBills]);
//   }, []);

//   // Filter bills by status and search query
//   const pendingBills = bills.filter(
//     (bill) =>
//       bill.status === "pending" &&
//       (searchQuery
//         ? bill.id.toLowerCase().includes(searchQuery.toLowerCase())
//         : true)
//   );

//   const handleBillClick = (bill: Bill) => {
//     setSelectedBill(bill);
//   };

//   const handleCloseModal = () => {
//     setSelectedBill(null);
//   };

//   const handleCompleteBill = (billId: string) => {
//     // Update the bill status in the mock data
//     updateBillStatus(billId, "paid");

//     // Update the local state to reflect the change
//     setBills((prevBills) =>
//       prevBills.map((bill) =>
//         bill.id === billId ? { ...bill, status: "paid" } : bill
//       )
//     );

//     // Close the modal
//     setSelectedBill(null);
//   };

//   return (
//     <div className="min-h-screen bg-[#f0f5ee]">
//       <OfficeSidebar />

//       <div className="ml-64 p-8">
//         {/* Back button */}
//         <button
//           onClick={() => navigate("/office")}
//           className="flex items-center text-[#2d6e7e] hover:text-[#1d5d6b] mb-4 transition-colors"
//         >
//           <ArrowLeft size={20} className="mr-1" />
//           <span>กลับไปหน้าหลัก</span>
//         </button>

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
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
//           {pendingBills.length > 0 ? (
//             pendingBills.map((bill) => (
//               <BillCard key={bill.id} bill={bill} onClick={handleBillClick} />
//             ))
//           ) : (
//             <div className="col-span-2 text-center py-8 text-gray-500">
//               ไม่พบบิลค้างจ่าย
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Checking Bill Modal */}
//       {selectedBill && (
//         <CheckingBillModal
//           bill={selectedBill}
//           onClose={handleCloseModal}
//           onComplete={handleCompleteBill}
//         />
//       )}
//     </div>
//   );
// };
