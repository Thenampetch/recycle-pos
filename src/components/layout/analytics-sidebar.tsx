"use client";

import type React from "react";
import { useAuth } from "../../content/AuthContent";
import { Button } from "../ui/Button";
import {
  BarChart4,
  ShoppingCart,
  Users,
  Calendar,
  Settings,
} from "lucide-react";
import logo from "../../assets/logonobg.svg";
import { useNavigate } from "react-router-dom";

interface AnalyticsSidebarProps {
  activePage?: string;
  currentDate?: string;
  currentTime?: string;
}

export const AnalyticsSidebar: React.FC<AnalyticsSidebarProps> = ({
  activePage = "dashboard",
  currentDate = "20 พฤศจิกายน",
  currentTime = "13.23 น.",
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "แดชบอร์ด",
      icon: <BarChart4 size={20} />,
      path: "/analytics",
    },
    {
      id: "inventory",
      label: "สินค้าคงคลัง",
      icon: <ShoppingCart size={20} />,
      path: "/analytics/inventory",
    },
    {
      id: "members",
      label: "สมาชิก",
      icon: <Users size={20} />,
      path: "/analytics/members",
    },
    {
      id: "reports",
      label: "รายงาน",
      icon: <Calendar size={20} />,
      path: "/analytics/reports",
    },
    {
      id: "settings",
      label: "ตั้งค่า",
      icon: <Settings size={20} />,
      path: "/analytics/settings",
    },
  ];

  return (
    <div className="bg-[#2d6e7e] h-screen w-64 fixed left-0 top-0 flex flex-col p-4">
      {/* Logo and title */}
      <div className="p-4 border-b border-[#1d5d6d] flex items-center justify-center flex-col">
        <img
          src={logo}
          alt="DOI SAKET RECYCLE"
          className="w-max h-max mx-auto"
        />
        <h2 className="text-center text-white font-bold">DOI SAKET RECYCLE</h2>

        <p className="text-sm opacity-80 mt-1 text-white">
          ระบบวิเคราะห์ข้อมูล
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activePage === item.id
                  ? "bg-[#1d5d6d] text-white"
                  : "text-white/80 hover:bg-[#1d5d6d] hover:text-white"
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* User info and logout */}
      <div className="mt-auto">
        <div className="text-center text-white mb-4">
          <p className="font-bold">{currentDate}</p>
          <p>{currentTime}</p>
        </div>
        <div className="bg-slate-300 border-2 border-slate-400 p-4 rounded mb-4">
          <p className="text-center">Recorder:</p>
          <p className="text-center font-bold">{user?.name}</p>
        </div>
        <Button variant="danger" fullWidth onClick={logout}>
          LOG OUT
        </Button>
      </div>
    </div>
  );
};
