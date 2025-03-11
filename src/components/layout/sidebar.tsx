import type React from "react";
import { useAuth } from "../../content/AuthContent";
import { Button } from "../ui/Button";
import logo from "../../assets/logonobg.svg";

interface SidebarProps {
  activeMaterial: string;
  onMaterialChange: (material: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeMaterial,
  onMaterialChange,
}) => {
  const { user, logout } = useAuth();

  const materials = [
    { id: "โลหะ", name: "โลหะ" },
    { id: "เหล็ก", name: "เหล็ก" },
    { id: "พลาสติก", name: "พลาสติก" },
    { id: "กระดาษ", name: "กระดาษ" },
    { id: "แก้ว", name: "แก้ว" },
    { id: "แบตเตอรี่", name: "แบตเตอรี่" },
    { id: "ท่อพี.วี.ซี.", name: "ท่อพี.วี.ซี." },
    { id: "อื่นๆ", name: "อื่นๆ" },
  ];

  return (
    <div className="bg-secondary-dark h-screen w-64 fixed left-0 top-0 p-4 flex flex-col">
      <div className="mb-4">
        <img
          src={logo}
          alt="DOI SAKET RECYCLE"
          className="w-max h-max mx-auto"
        />
        <h2 className="text-center font-bold">DOI SAKET RECYCLE</h2>
      </div>

      <div className="flex-1">
        {materials.map((material) => (
          <button
            key={material.id}
            className={`sidebar-btn mb-2 ${
              activeMaterial === material.id ? "active-sidebar-btn" : ""
            }`}
            onClick={() => onMaterialChange(material.id)}
          >
            {material.name}
          </button>
        ))}
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
  );
};
