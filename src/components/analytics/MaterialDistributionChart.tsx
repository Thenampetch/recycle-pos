"use client";

import type React from "react";
import { useState } from "react";

export const MaterialDistributionChart: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  // Mock data for pie chart
  const segments = [
    { color: "#2d6e7e", percent: 35, label: "โลหะ", value: 160562.5 },
    { color: "#ff7e67", percent: 25, label: "เหล็ก", value: 114687.5 },
    { color: "#fbd46d", percent: 20, label: "กระดาษ", value: 91750 },
    { color: "#4ecdc4", percent: 10, label: "แก้ว", value: 45875 },
    { color: "#8675a9", percent: 10, label: "อื่นๆ", value: 45875 },
  ];

  const handleSegmentHover = (index: number) => {
    setActiveSegment(index);
  };

  const handleSegmentLeave = () => {
    setActiveSegment(null);
  };

  const handleSegmentClick = (index: number) => {
    alert(
      `ดูรายละเอียดของ ${segments[index].label}: ${segments[
        index
      ].value.toLocaleString()} บาท (${segments[index].percent}%)`
    );
  };

  return (
    <div className="h-64 flex items-center justify-center">
      <div className="relative w-40 h-40">
        {/* Mock pie chart */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#f0f0f0" />

          {/* Pie segments - in a real chart these would be calculated properly */}
          <path
            d="M50,50 L95,50 A45,45 0 0,1 73,91 Z"
            fill={segments[0].color}
            opacity={activeSegment === null || activeSegment === 0 ? 1 : 0.5}
            onMouseEnter={() => handleSegmentHover(0)}
            onMouseLeave={handleSegmentLeave}
            onClick={() => handleSegmentClick(0)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <path
            d="M50,50 L73,91 A45,45 0 0,1 27,91 Z"
            fill={segments[1].color}
            opacity={activeSegment === null || activeSegment === 1 ? 1 : 0.5}
            onMouseEnter={() => handleSegmentHover(1)}
            onMouseLeave={handleSegmentLeave}
            onClick={() => handleSegmentClick(1)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <path
            d="M50,50 L27,91 A45,45 0 0,1 5,50 Z"
            fill={segments[2].color}
            opacity={activeSegment === null || activeSegment === 2 ? 1 : 0.5}
            onMouseEnter={() => handleSegmentHover(2)}
            onMouseLeave={handleSegmentLeave}
            onClick={() => handleSegmentClick(2)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <path
            d="M50,50 L5,50 A45,45 0 0,1 27,9 Z"
            fill={segments[3].color}
            opacity={activeSegment === null || activeSegment === 3 ? 1 : 0.5}
            onMouseEnter={() => handleSegmentHover(3)}
            onMouseLeave={handleSegmentLeave}
            onClick={() => handleSegmentClick(3)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <path
            d="M50,50 L27,9 A45,45 0 0,1 95,50 Z"
            fill={segments[4].color}
            opacity={activeSegment === null || activeSegment === 4 ? 1 : 0.5}
            onMouseEnter={() => handleSegmentHover(4)}
            onMouseLeave={handleSegmentLeave}
            onClick={() => handleSegmentClick(4)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="ml-8">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded ${
              activeSegment === index ? "bg-gray-50" : ""
            }`}
            onMouseEnter={() => handleSegmentHover(index)}
            onMouseLeave={handleSegmentLeave}
            onClick={() => handleSegmentClick(index)}
          >
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: segment.color }}
            ></div>
            <div className="text-sm">
              <span className="font-medium">{segment.label}</span>
              <span className="text-gray-500 ml-2">{segment.percent}%</span>
            </div>
            <div className="text-sm ml-2 text-gray-500">
              {segment.value.toLocaleString()} บาท
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
