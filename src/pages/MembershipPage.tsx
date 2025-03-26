"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../content/AuthContent";
import { useCart } from "../content/CartContent";
import logo from "../assets/logonobg.svg";

export const MembershipPage: React.FC = () => {
  const [memberCode, setMemberCode] = useState("");
  const [showMemberForm, setShowMemberForm] = useState(false);
  const { user, logout } = useAuth();
  const { setMember } = useCart();
  const navigate = useNavigate();

  const handleRegularCustomer = () => {
    // Set default member information for regular customers
    setMember({
      id: "0001",
      code: "0001",
      name: "ลูกค้าทั่วไป",
    });
    navigate("/pos");
  };

  const handleMemberButtonClick = () => {
    setShowMemberForm(true);
  };

  const handleMemberCustomer = () => {
    if (memberCode) {
      // Here you would typically fetch the member details from the backend
      // For now, we'll just set a mock member
      setMember({
        id: memberCode,
        code: memberCode,
        name: "สมชาย ใจดี", // Replace with actual member name from the backend
      });
      navigate("/pos");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-secondary-dark h-screen w-64 fixed left-0 top-0 p-4 flex flex-col">
        <div className="mb-8">
          <img
            src={logo}
            alt="DOI SAKET RECYCLE"
            className="w-max h-max mx-auto"
          />
          <h2 className="text-center font-bold">DOI SAKET RECYCLE</h2>
        </div>

        <div className="mt-auto">
          <div className="bg-slate-300 border-2 border-slate-400 p-4 rounded mb-4">
            <p className="text-center">Recorder:</p>
            <p className="text-center font-bold">{user?.name}</p>
          </div>
          <Button variant="danger" fullWidth onClick={logout}>
            LOG OUT
          </Button>
        </div>
      </div>

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">รับซื้อสินค้า</h1>

          {showMemberForm && (
            <div className="bg-teal-100 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4 text-center">รหัสสมาชิก</h2>
              <Input
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
                placeholder="ใส่รหัสสมาชิก เช่น 1002"
                className="text-center text-xl"
              />
              <Button
                variant="primary"
                fullWidth
                className="mt-4"
                onClick={handleMemberCustomer}
              >
                ตกลง
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="primary"
              fullWidth
              className="py-4 text-lg"
              onClick={handleRegularCustomer}
            >
              ลูกค้าทั่วไป
            </Button>
            <Button
              variant="primary"
              fullWidth
              className="py-4 text-lg"
              onClick={handleMemberButtonClick}
            >
              ลูกค้าสมาชิก
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};