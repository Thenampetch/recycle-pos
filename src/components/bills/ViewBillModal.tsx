"use client";

import type React from "react";

import { useState } from "react";
import { X, FileText, Image, Check } from "lucide-react";
import type { Bill } from "./billcard";
import { ImagePreviewModal } from "./ImagePreviewModal";

interface BillItem {
  id: number;
  name: string;
  weight: number;
  price: number;
  total: number;
}

interface ViewBillModalProps {
  bill: Bill;
  onClose: () => void;
}

export const ViewBillModal: React.FC<ViewBillModalProps> = ({
  bill,
  onClose,
}) => {
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [imageType, setImageType] = useState<
    "weight-summary" | "weight-item" | "receipt"
  >("weight-summary");

  // Mock bill items
  const billItems: BillItem[] = [
    {
      id: 1,
      name: "ทองแดง#1",
      weight: 5.2,
      price: 297,
      total: 1544.4,
    },
    {
      id: 2,
      name: "เหล็กหนา(สั้น)",
      weight: 10.5,
      price: 9.8,
      total: 102.9,
    },
    {
      id: 3,
      name: "กระดาษลังน้ำตาล",
      weight: 8.0,
      price: 4.2,
      total: 33.6,
    },
  ];

  // Mock payment details
  const paymentDetails = {
    paymentDate: "20 พฤศจิกายน 2567",
    paymentTime: "15:45 น.",
    paymentMethod: "เงินสด",
    cashier: "มิตรา",
  };

  // Mock weight scale images
  const weightScaleImages = [
    "/placeholder.svg", // Replace with actual image URLs from backend
  ];

  const showWeightSummaryImage = () => {
    setImageType("weight-summary");
    setCurrentImage(weightScaleImages[0]);
    setShowImagePreview(true);
  };

  const showWeightScaleImage = (itemId: number, itemName: string) => {
    setImageType("weight-item");
    setCurrentImage("/placeholder.svg"); // Replace with actual weight scale image for this specific item
    setShowImagePreview(true);
  };

  const showReceiptImage = () => {
    setImageType("receipt");
    setCurrentImage("/placeholder.svg"); // Replace with actual receipt image
    setShowImagePreview(true);
  };

  const totalAmount = billItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#2d6e7e] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <h2 className="text-xl font-bold">รายละเอียดบิล {bill.id}</h2>
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
              <p className="font-medium">{bill.date}</p>
            </div>
            <div>
              <p className="text-gray-500">เวลา:</p>
              <p className="font-medium">{bill.time}</p>
            </div>
            <div>
              <p className="text-gray-500">รหัสสมาชิก:</p>
              <p className="font-medium">{bill.memberCode}</p>
            </div>
            <div>
              <p className="text-gray-500">ชื่อ:</p>
              <p className="font-medium">{bill.memberName}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-green-800 mb-2 flex items-center">
              <Check size={18} className="mr-2" />
              ข้อมูลการชำระเงิน
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">วันที่ชำระ:</p>
                <p className="font-medium">{paymentDetails.paymentDate}</p>
              </div>
              <div>
                <p className="text-gray-500">เวลาชำระ:</p>
                <p className="font-medium">{paymentDetails.paymentTime}</p>
              </div>
              <div>
                <p className="text-gray-500">วิธีการชำระ:</p>
                <p className="font-medium">{paymentDetails.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500">ผู้รับชำระ:</p>
                <p className="font-medium">{paymentDetails.cashier}</p>
              </div>
            </div>
          </div>

          {/* Bill Items */}
          <div className="border rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">รายการ</th>
                  <th className="py-2 px-4 text-right">น้ำหนัก (กก.)</th>
                  <th className="py-2 px-4 text-right">ราคา/หน่วย</th>
                  <th className="py-2 px-4 text-right">รวม</th>
                  <th className="py-2 px-4 text-center">ภาพการชั่ง</th>
                </tr>
              </thead>
              <tbody>
                {billItems.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4 text-right">
                      {item.weight.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {item.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => showWeightScaleImage(item.id, item.name)}
                        className="text-blue-600 hover:text-blue-800"
                        title={`ดูภาพการชั่ง ${item.name}`}
                      >
                        <Image size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
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

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <ImagePreviewModal
          onClose={() => setShowImagePreview(false)}
          imageUrl={currentImage}
          title={
            imageType === "weight-summary"
              ? "ภาพสรุปการชั่งน้ำหนัก"
              : imageType === "weight-item"
              ? "ภาพการชั่งน้ำหนักวัสดุ"
              : "ภาพใบเสร็จ"
          }
        />
      )}
    </div>
  );
};
