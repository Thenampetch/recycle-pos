"use client";

import type React from "react";
import { useAuth } from "../../content/AuthContent";
import { Button } from "../ui/Button";
import logo from "../../assets/logonobg.svg";

interface OfficeSidebarProps {
  currentDate?: string;
  currentTime?: string;
}

export const OfficeSidebar: React.FC<OfficeSidebarProps> = ({
  currentDate = "20 พฤศจิกายน",
  currentTime = "13.23 น.",
}) => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-[#dae8d6] h-screen w-64 fixed left-0 top-0 flex flex-col p-4">
      <div className="mb-32">
        <img
          src={logo}
          alt="DOI SAKET RECYCLE"
          className="w-max h-max mx-auto"
        />
        <h2 className="text-center font-bold">DOI SAKET RECYCLE</h2>
      </div>

      {/* Notifications Section */}
      <div className="mb-6 -items-center text-center">
        <h2 className="font-bold text-lg mb-2 mt-4">แจ้งลูกค้า</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">หยุดปีใหม่</h3>
            <p className="text-sm">30 ธันวาคม - 2 มกราคม</p>
          </div>
          <div>
            <h3 className="font-semibold">ปรับราคา</h3>
            <p className="text-sm">ทองแดง #2 ปรับลง 0.5</p>
            <p className="text-sm">เหล็กรวม ปรับขึ้น 0.75</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-auto">
        <div className="text-center mb-4">
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
