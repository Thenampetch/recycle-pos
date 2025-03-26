"use client";

import type React from "react";
import { useState } from "react";
import { Pencil, Image } from "lucide-react";
import axios from "axios";

interface TransactionSummaryProps {
  totalWeight: number;
  totalAmount: number;
  truckWeight: number;
  onTruckWeightChange: (weight: number) => void;
  onCheckout: () => void;
  onCancel: () => void;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  totalWeight,
  totalAmount,
  truckWeight,
  onTruckWeightChange,
  onCheckout,
  onCancel,
}) => {
  const [isEditingTruckWeight, setIsEditingTruckWeight] = useState(false);
  const [truckWeightValue, setTruckWeightValue] = useState(
    truckWeight.toString()
  );

  const handleSaveTruckWeight = () => {
    const newWeight = Number.parseFloat(truckWeightValue);
    if (!isNaN(newWeight) && newWeight >= 0) {
      onTruckWeightChange(newWeight);
    }
    setIsEditingTruckWeight(false);
  };

  const netWeight = totalWeight - truckWeight;

  const handleCheckout = async () => {
    // Create invoice data
    const invoiceData = {
      invoiceID: "0001", // Generate or fetch this from your logic
      memberID: "1002", // Replace with actual member ID
      memberName: "General Customer", // Replace with actual member name
      items: [], // Populate with actual items from the cart
      totalWeight: netWeight,
      totalAmount: totalAmount,
      truckWeight: truckWeight,
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      await axios.post("http://localhost:3000/invoices", invoiceData);
      alert("Invoice created successfully!");
      onCheckout(); // Call the checkout function after successful invoice creation
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice.");
    }
  };

  return (
    <div className="mt-auto">
      <div className="border-t border-gray-200 mt-4">
        <div className="p-3 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span>น้ำหนักรถบรรทุก</span>
            <button
              className="text-teal-600"
              onClick={() => setIsEditingTruckWeight(true)}
            >
              <Pencil size={16} />
            </button>
          </div>
          <button className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center">
            <Image size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="p-3 border-b border-gray-200">
          <div className="text-base">น้ำหนักรวม {totalWeight.toFixed(2)}</div>
          {isEditingTruckWeight ? (
            <div className="flex items-center gap-2">
              <span>รถหนัก:</span>
              <input
                type="number"
                className="w-20 p-1 border rounded"
                value={truckWeightValue}
                onChange={(e) => setTruckWeightValue(e.target.value)}
                autoFocus
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                onClick={handleSaveTruckWeight}
              >
                บันทึก
              </button>
            </div>
          ) : (
            <div>รถหนัก: {truckWeight.toFixed(2)}</div>
          )}
        </div>

        <div className="p-3 text-left border-b border-gray-200">
          <div className="text-lg font-bold">
            น้ำหนักสุทธิ {netWeight.toFixed(2)}
          </div>
        </div>

        <div className="p-3 flex justify-between items-center">
          <div className="font-bold text-lg">ยอดรวม</div>
          <div className="font-bold text-xl text-green-600">
            {totalAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      <button
        className="w-full bg-[#2d6e7e] text-white p-4 font-bold rounded-md mb-2"
        onClick={handleCheckout}
      >
        เสร็จสิ้น
      </button>
      <button
        className="w-full bg-[#8b3e3e] text-white p-4 font-bold rounded-md"
        onClick={onCancel}
      >
        ยกเลิก
      </button>
    </div>
  );
};

// "use client";

// import type React from "react";
// import { useState } from "react";
// import { Pencil, Image } from "lucide-react";

// interface TransactionSummaryProps {
//   totalWeight: number;
//   totalAmount: number;
//   truckWeight: number;
//   onTruckWeightChange: (weight: number) => void;
//   onCheckout: () => void;
//   onCancel: () => void;
// }

// export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
//   totalWeight,
//   totalAmount,
//   truckWeight,
//   onTruckWeightChange,
//   onCheckout,
//   onCancel,
// }) => {
//   const [isEditingTruckWeight, setIsEditingTruckWeight] = useState(false);
//   const [truckWeightValue, setTruckWeightValue] = useState(
//     truckWeight.toString()
//   );

//   const handleSaveTruckWeight = () => {
//     const newWeight = Number.parseFloat(truckWeightValue);
//     if (!isNaN(newWeight) && newWeight >= 0) {
//       onTruckWeightChange(newWeight);
//     }
//     setIsEditingTruckWeight(false);
//   };

//   const netWeight = totalWeight - truckWeight;

//   return (
//     <div className="mt-auto">
//       <div className="border-t border-gray-200 mt-4">
//         <div className="p-3 flex justify-between items-center border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <span>น้ำหนักรถบรรทุก</span>
//             <button
//               className="text-teal-600"
//               onClick={() => setIsEditingTruckWeight(true)}
//             >
//               <Pencil size={16} />
//             </button>
//           </div>
//           <button className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center">
//             <Image size={16} className="text-gray-600" />
//           </button>
//         </div>

//         <div className="p-3 border-b border-gray-200">
//           <div className="text-base">น้ำหนักรวม {totalWeight.toFixed(2)}</div>
//           {isEditingTruckWeight ? (
//             <div className="flex items-center gap-2">
//               <span>รถหนัก:</span>
//               <input
//                 type="number"
//                 className="w-20 p-1 border rounded"
//                 value={truckWeightValue}
//                 onChange={(e) => setTruckWeightValue(e.target.value)}
//                 autoFocus
//               />
//               <button
//                 className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
//                 onClick={handleSaveTruckWeight}
//               >
//                 บันทึก
//               </button>
//             </div>
//           ) : (
//             <div>รถหนัก: {truckWeight.toFixed(2)}</div>
//           )}
//         </div>

//         <div className="p-3 text-left border-b border-gray-200">
//           <div className="text-lg font-bold">
//             น้ำหนักสุทธิ {netWeight.toFixed(2)}
//           </div>
//         </div>

//         {/* <div className="p-3 flex justify-between items-center">
//           <div className="font-bold text-lg">ยอดรวม</div>
//           <div className="font-bold text-xl text-green-600">
//             {totalAmount.toLocaleString(undefined, {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}
//           </div>
//         </div> */}
//       </div>

//       <button
//         className="w-full bg-[#2d6e7e] text-white p-4 font-bold rounded-md mb-2"
//         onClick={onCheckout}
//       >
//         เสร็จสิ้น
//       </button>
//       <button
//         className="w-full bg-[#8b3e3e] text-white p-4 font-bold rounded-md"
//         onClick={onCancel}
//       >
//         ยกเลิก
//       </button>
//     </div>
//   );
// };
