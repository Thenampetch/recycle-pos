"use client";

import type React from "react";
import { useState } from "react";
import { X, Check, FileText } from "lucide-react";
import type { Bill } from "./BillCard";

interface BillItem {
  materialID: string;
  materialName: string;
  quantity: number;
  price: number;
  total: number;
  image?: string; // Optional image URL for each item
}

interface CheckingBillModalProps {
  bill: Bill;
  onClose: () => void;
  onComplete: (billId: string) => void;
}

export const CheckingBillModal: React.FC<CheckingBillModalProps> = ({
  bill,
  onClose,
  onComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    await onComplete(bill.invoiceID);
    setIsLoading(false);
  };

  // Calculate total amount safely
  const totalAmount = bill.items ? bill.items.reduce((sum, item) => sum + item.total, 0) : 0;

  // Format date and time for Thai locale
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "ยังไม่ระบุ";
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "ยังไม่ระบุ";
    return new Date(dateString).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#2d6e7e] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <h2 className="text-xl font-bold">ตรวจสอบบิล {bill.invoiceID}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#245d6b] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Bill Information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">วันที่:</p>
              <p className="font-medium">{formatDate(bill.date)}</p>
            </div>
            <div>
              <p className="text-gray-500">เวลา:</p>
              <p className="font-medium">{formatTime(bill.time)}</p>
            </div>
            <div>
              <p className="text-gray-500">รหัสสมาชิก:</p>
              <p className="font-medium">{bill.memberID}</p>
            </div>
            <div>
              <p className="text-gray-500">ชื่อ:</p>
              <p className="font-medium">{bill.memberName}</p>
            </div>
          </div>

          {/* Bill Items */}
          <div className="border rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">รายการ</th>
                  <th className="py-2 px-4 text-right">จำนวน</th>
                  <th className="py-2 px-4 text-right">ราคา/หน่วย</th>
                  <th className="py-2 px-4 text-right">รวม</th>
                  <th className="py-2 px-4 text-center">ภาพการชั่ง</th>
                </tr>
              </thead>
              <tbody>
                {bill.items && bill.items.length > 0 ? (
                  bill.items.map((item: BillItem) => (
                    <tr key={item.materialID} className="border-t border-gray-200">
                      <td className="py-3 px-4">{item.materialName}</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">{item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">{item.total.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        {item.image && (
                          <img src={item.image} alt={item.materialName} className="w-12 h-12 object-cover" />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-3 px-4 text-center text-gray-500">ไม่มีรายการสินค้า</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr className="border-t border-gray-200">
                  <td colSpan={3} className="py-3 px-4 font-bold text-right">
                    ยอดรวมทั้งสิ้น
                  </td>
                  <td className="py-3 px-4 font-bold text-right text-green-600">
                    {totalAmount.toFixed(2)} บาท
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>กำลังดำเนินการ...</>
              ) : (
                <>
                  <Check size={18} />
                  เสร็จสิ้นการชำระเงิน
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// "use client";

// import type React from "react";

// import { useState } from "react";
// import { X, Check, FileText, Edit2, Image, Save } from "lucide-react";
// import type { Bill } from "./BillCard";
// import { ImagePreviewModal } from "./ImagePreviewModal";

// interface BillItem {
//   id: number;
//   name: string;
//   weight: number;
//   price: number;
//   total: number;
//   isEditing: boolean;
// }

// interface CheckingBillModalProps {
//   bill: Bill;
//   onClose: () => void;
//   onComplete: (billId: string) => void;
// }

// export const CheckingBillModal: React.FC<CheckingBillModalProps> = ({
//   bill,
//   onClose,
//   onComplete,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showImagePreview, setShowImagePreview] = useState(false);
//   const [currentImage, setCurrentImage] = useState<string>("");
//   const [imageType, setImageType] = useState<"weight-summary" | "weight-item">(
//     "weight-summary"
//   );

//   // Mock bill items with editable state
//   const [billItems, setBillItems] = useState<BillItem[]>([
//     {
//       id: 1,
//       name: "ทองแดง#1",
//       weight: 5.2,
//       price: 297,
//       total: 1544.4,
//       isEditing: false,
//     },
//     {
//       id: 2,
//       name: "เหล็กหนา(สั้น)",
//       weight: 10.5,
//       price: 9.8,
//       total: 102.9,
//       isEditing: false,
//     },
//     {
//       id: 3,
//       name: "กระดาษลังน้ำตาล",
//       weight: 8.0,
//       price: 4.2,
//       total: 33.6,
//       isEditing: false,
//     },
//   ]);

//   // Mock weight scale images
//   const weightScaleImages = [
//     "/placeholder.svg", // Replace with actual image URLs from backend
//   ];

//   const handleComplete = async () => {
//     setIsLoading(true);

//     // Simulate API call with timeout
//     // Replace this with actual API call when backend is ready
//     setTimeout(() => {
//       onComplete(bill.invoiceID);
//       setIsLoading(false);
//     }, 1000);
//   };

//   const toggleEditMode = (itemId: number) => {
//     setBillItems(
//       billItems.map((item) =>
//         item.id === itemId ? { ...item, isEditing: !item.isEditing } : item
//       )
//     );
//   };

//   const updateItem = (itemId: number, updates: Partial<BillItem>) => {
//     setBillItems(
//       billItems.map((item) => {
//         if (item.id === itemId) {
//           const updatedItem = { ...item, ...updates };
//           // Recalculate total
//           updatedItem.total = updatedItem.weight * updatedItem.price;
//           return updatedItem;
//         }
//         return item;
//       })
//     );
//   };

//   const showWeightSummaryImage = () => {
//     setImageType("weight-summary");
//     setCurrentImage(weightScaleImages[0]);
//     setShowImagePreview(true);
//   };

//   const showWeightScaleImage = (itemId: number, itemName: string) => {
//     setImageType("weight-item");
//     setCurrentImage("/placeholder.svg"); // Replace with actual weight scale image for this specific item
//     setShowImagePreview(true);
//   };

//   const totalAmount = billItems.reduce((sum, item) => sum + item.total, 0);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#2d6e7e] text-white rounded-t-lg">
//           <div className="flex items-center gap-2">
//             <FileText size={20} />
//             <h2 className="text-xl font-bold">ตรวจสอบบิล {bill.invoiceID}</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 rounded-full hover:bg-[#245d6b] transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-6">
//           {/* Bill Information */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div>
//               <p className="text-gray-500">วันที่:</p>
//               <p className="font-medium">{bill.date}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">เวลา:</p>
//               <p className="font-medium">{bill.time}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">รหัสสมาชิก:</p>
//               <p className="font-medium">{bill.memberCode}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">ชื่อ:</p>
//               <p className="font-medium">{bill.memberName}</p>
//             </div>
//           </div>

//           {/* Weight Scale Image */}
//           <div className="mb-6 flex justify-between items-center">
//             <h3 className="font-medium">ภาพสรุปการชั่งน้ำหนัก</h3>
//             <button
//               onClick={showWeightSummaryImage}
//               className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
//             >
//               <Image size={20} />
//               <span>ดูภาพ</span>
//             </button>
//           </div>

//           {/* Bill Items */}
//           <div className="border rounded-lg overflow-hidden mb-6">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="py-2 px-4 text-left">รายการ</th>
//                   <th className="py-2 px-4 text-right">น้ำหนัก (กก.)</th>
//                   <th className="py-2 px-4 text-right">ราคา/หน่วย</th>
//                   <th className="py-2 px-4 text-right">รวม</th>
//                   <th className="py-2 px-4 text-center">ภาพการชั่ง</th>
//                   <th className="py-2 px-4 text-center">แก้ไข</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {billItems.map((item) => (
//                   <tr key={item.id} className="border-t border-gray-200">
//                     <td className="py-3 px-4">
//                       {item.isEditing ? (
//                         <input
//                           type="text"
//                           value={item.name}
//                           onChange={(e) =>
//                             updateItem(item.id, { name: e.target.value })
//                           }
//                           className="w-full p-1 border rounded"
//                         />
//                       ) : (
//                         item.name
//                       )}
//                     </td>
//                     <td className="py-3 px-4 text-right">
//                       {item.isEditing ? (
//                         <input
//                           type="number"
//                           value={item.weight}
//                           onChange={(e) =>
//                             updateItem(item.id, {
//                               weight: Number.parseFloat(e.target.value) || 0,
//                             })
//                           }
//                           className="w-20 p-1 border rounded text-right"
//                           step="0.01"
//                         />
//                       ) : (
//                         item.weight.toFixed(2)
//                       )}
//                     </td>
//                     <td className="py-3 px-4 text-right">
//                       {item.isEditing ? (
//                         <input
//                           type="number"
//                           value={item.price}
//                           onChange={(e) =>
//                             updateItem(item.id, {
//                               price: Number.parseFloat(e.target.value) || 0,
//                             })
//                           }
//                           className="w-20 p-1 border rounded text-right"
//                           step="0.01"
//                         />
//                       ) : (
//                         item.price.toFixed(2)
//                       )}
//                     </td>
//                     <td className="py-3 px-4 text-right">
//                       {item.total.toFixed(2)}
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         onClick={() => showWeightScaleImage(item.id, item.name)}
//                         className="text-blue-600 hover:text-blue-800"
//                         title={`ดูภาพการชั่ง ${item.name}`}
//                       >
//                         <Image size={18} />
//                       </button>
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         onClick={() => toggleEditMode(item.id)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         {item.isEditing ? (
//                           <Save size={18} />
//                         ) : (
//                           <Edit2 size={18} />
//                         )}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot className="bg-gray-50">
//                 <tr className="border-t border-gray-200">
//                   <td colSpan={3} className="py-3 px-4 font-bold text-right">
//                     ยอดรวมทั้งสิ้น
//                   </td>
//                   <td className="py-3 px-4 font-bold text-right text-green-600">
//                     {totalAmount.toFixed(2)} บาท
//                   </td>
//                   <td colSpan={2}></td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4">
//             <button
//               onClick={onClose}
//               className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               ยกเลิก
//             </button>
//             <button
//               onClick={handleComplete}
//               disabled={isLoading}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <>กำลังดำเนินการ...</>
//               ) : (
//                 <>
//                   <Check size={18} />
//                   เสร็จสิ้นการชำระเงิน
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Image Preview Modal */}
//       {showImagePreview && (
//         <ImagePreviewModal
//           onClose={() => setShowImagePreview(false)}
//           imageUrl={currentImage}
//           title={
//             imageType === "weight-summary"
//               ? "ภาพสรุปการชั่งน้ำหนัก"
//               : "ภาพการชั่งน้ำหนักวัสดุ"
//           }
//         />
//       )}
//     </div>
//   );
// };
