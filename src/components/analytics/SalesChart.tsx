"use client";

import type React from "react";

export const SalesChart: React.FC = () => {
  // This is a placeholder for a real chart component
  // In a real implementation, you would use a library like Chart.js, Recharts, or ApexCharts

  // Mock data for purchasing (buying materials from customers)
  const purchasingData = [
    { month: "ม.ค.", value: 32000 },
    { month: "ก.พ.", value: 28000 },
    { month: "มี.ค.", value: 35000 },
    { month: "เม.ย.", value: 30000 },
    { month: "พ.ค.", value: 38000 },
    { month: "มิ.ย.", value: 42000 },
    { month: "ก.ค.", value: 45000 },
    { month: "ส.ค.", value: 39000 },
    { month: "ก.ย.", value: 47000 },
    { month: "ต.ค.", value: 43000 },
    { month: "พ.ย.", value: 50000 },
    { month: "ธ.ค.", value: 48000 },
  ];

  // Mock data for selling (selling processed materials)
  const sellingData = [
    { month: "ม.ค.", value: 38000 },
    { month: "ก.พ.", value: 35000 },
    { month: "มี.ค.", value: 42000 },
    { month: "เม.ย.", value: 37000 },
    { month: "พ.ค.", value: 45000 },
    { month: "มิ.ย.", value: 50000 },
    { month: "ก.ค.", value: 53000 },
    { month: "ส.ค.", value: 47000 },
    { month: "ก.ย.", value: 55000 },
    { month: "ต.ค.", value: 51000 },
    { month: "พ.ย.", value: 58000 },
    { month: "ธ.ค.", value: 56000 },
  ];

  // Calculate max value for scaling
  const maxValue = Math.max(
    ...purchasingData.map((d) => d.value),
    ...sellingData.map((d) => d.value)
  );

  // Calculate heights as percentages of max value
  const purchasingHeights = purchasingData.map((d) =>
    Math.round((d.value / maxValue) * 100)
  );
  const sellingHeights = sellingData.map((d) =>
    Math.round((d.value / maxValue) * 100)
  );

  return (
    <div className="h-72 relative">
      {/* Chart legend */}
      <div className="absolute top-0 right-0 flex items-center gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#2d6e7e] mr-2"></div>
          <span>การซื้อ</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#ff7e67] mr-2"></div>
          <span>การขาย</span>
        </div>
      </div>

      {/* Chart container */}
      <div className="absolute inset-x-0 bottom-6 top-8 flex items-end px-2">
        {/* Bars for each month */}
        {purchasingData.map((item, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center group"
            onClick={() =>
              alert(
                `${
                  item.month
                }: ซื้อ ${item.value.toLocaleString()} บาท, ขาย ${sellingData[
                  index
                ].value.toLocaleString()} บาท`
              )
            }
          >
            {/* Selling bar (on top) */}
            <div
              className="w-5/6 bg-[#ff7e67] rounded-t-sm mb-px relative group-hover:bg-opacity-80 transition-colors cursor-pointer"
              style={{ height: `${sellingHeights[index]}%` }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ขาย: {sellingData[index].value.toLocaleString()} บาท
              </div>
            </div>

            {/* Purchasing bar (on bottom) */}
            <div
              className="w-5/6 bg-[#2d6e7e] rounded-t-sm relative group-hover:bg-opacity-80 transition-colors cursor-pointer"
              style={{ height: `${purchasingHeights[index]}%` }}
            >
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ซื้อ: {purchasingData[index].value.toLocaleString()} บาท
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
        {purchasingData.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            {item.month}
          </div>
        ))}
      </div>

      {/* Y-axis grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        <div className="border-t border-gray-200 w-full h-0"></div>
        <div className="border-t border-gray-200 w-full h-0"></div>
        <div className="border-t border-gray-200 w-full h-0"></div>
        <div className="border-t border-gray-200 w-full h-0"></div>
      </div>
    </div>
  );
};
