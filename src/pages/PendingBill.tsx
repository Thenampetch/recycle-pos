"use client";

import { useState } from "react";
import { OfficeSidebar } from "../components/layout/office-sidebar";
import { BillCard, mockBills } from "../components/bills/billcard";
import { Search } from "lucide-react";

export const PendingBillsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bills by status and search query
  // When backend is ready, replace this with API call:
  // const [pendingBills, setPendingBills] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchBills('pending');
  //     setPendingBills(data);
  //   };
  //   fetchData();
  // }, []);
  const pendingBills = mockBills.filter(
    (bill) =>
      bill.status === "pending" &&
      (searchQuery
        ? bill.id.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div className="min-h-screen bg-[#f0f5ee]">
      <OfficeSidebar />

      <div className="ml-64 p-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pendingBills.length > 0 ? (
            pendingBills.map((bill) => <BillCard key={bill.id} bill={bill} />)
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              ไม่พบบิลค้างจ่าย
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
