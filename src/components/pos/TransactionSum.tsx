import type React from "react";
import { Button } from "../ui/Button";

interface TransactionSummaryProps {
  totalWeight: number;
  totalAmount: number;
  onCheckout: () => void;
  onCancel: () => void;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  totalWeight,
  totalAmount,
  onCheckout,
  onCancel,
}) => {
  return (
    <div className="mt-4">
      <div className="bg-white p-4 rounded mb-4">
        <div className="flex justify-between border-b pb-2 mb-2">
          <span>น้ำหนักรวม</span>
          <span className="font-bold">{totalWeight.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>ราคารวม</span>
          <span className="font-bold text-lg">{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <Button variant="success" fullWidth onClick={onCheckout}>
          เสร็จสิ้น
        </Button>
        <Button variant="danger" fullWidth onClick={onCancel}>
          ยกเลิก
        </Button>
      </div>
    </div>
  );
};
