"use client";

import type React from "react";

import { X } from "lucide-react";

interface ImagePreviewModalProps {
  onClose: () => void;
  imageUrl?: string;
  title?: string;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  onClose,
  imageUrl = "/placeholder.svg",
  title = "ภาพ",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Image container */}
        <div className="bg-black rounded-lg overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="w-full object-contain max-h-[70vh]"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>
    </div>
  );
};
