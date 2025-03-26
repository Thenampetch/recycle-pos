"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OfficeSidebar } from "../components/layout/office-sidebar";
import { BillCard } from "../components/bills/BillCard";
import { ViewBillModal } from "../components/bills/ViewBillModal";
import { Search, ArrowLeft } from "lucide-react";
import type { Bill } from "../components/bills/BillCard";
import axios from "axios";

export const PaidBillsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const navigate = useNavigate();

  // Load bills on component mount
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoices");
        const paidBills = response.data.filter((bill: Bill) => bill.status === "paid");
        setBills(paidBills);
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

  return (
    <div className="min-h-screen bg-[#f0f5ee]">
      <OfficeSidebar />

      <div className="ml-64 p-8">
        <button onClick={() => navigate("/office")} className="flex items-center text-[#2d6e7e] hover:text-[#1d5d6b] mb-4 transition-colors">
          <ArrowLeft size={20} className="mr-1" />
          <span>กลับไปหน้าหลัก</span>
        </button>

        <h1 className="text-4xl font-bold text-[#2d6e7e] mb-8 text-center">บิลจ่ายแล้ว</h1>

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
            <div className="col-span-2 text-center py-8 text-gray-500">ไม่พบบิลจ่ายแล้ว</div>
          )}
        </div>
      </div>

      {selectedBill && (
        <ViewBillModal bill={selectedBill} onClose={handleCloseModal} />
      )}
    </div>
  );
};

// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { OfficeSidebar } from "../components/layout/office-sidebar";
// import { BillCard, mockBills } from "../components/bills/BillCard";
// import { ViewBillModal } from "../components/bills/ViewBillModal";
// import { Search, ArrowLeft } from "lucide-react";
// import type { Bill } from "../components/bills/BillCard";

// export const PaidBillsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [bills, setBills] = useState<Bill[]>([]);
//   const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
//   const navigate = useNavigate();

//   // Load bills on component mount
//   useEffect(() => {
//     // In a real app, this would be an API call
//     setBills([...mockBills]);
//   }, []);

//   // Filter bills by status and search query
//   const paidBills = bills.filter(
//     (bill) =>
//       bill.status === "paid" &&
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
//           บิลจ่ายแล้ว
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
//           {paidBills.length > 0 ? (
//             paidBills.map((bill) => (
//               <BillCard key={bill.id} bill={bill} onClick={handleBillClick} />
//             ))
//           ) : (
//             <div className="col-span-2 text-center py-8 text-gray-500">
//               ไม่พบบิลจ่ายแล้ว
//             </div>
//           )}
//         </div>
//       </div>

//       {/* View Bill Modal */}
//       {selectedBill && (
//         <ViewBillModal bill={selectedBill} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };
