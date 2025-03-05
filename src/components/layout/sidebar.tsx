import type React from "react";
import { useAuth } from "../../content/AuthContent";
import { Button } from "../ui/Button";

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
    { id: "metal", name: "โลหะ" },
    { id: "plastic", name: "พลาสติก" },
    { id: "paper", name: "กระดาษ" },
    { id: "glass", name: "แก้ว" },
    { id: "other", name: "อื่นๆ" },
  ];

  return (
    <div className="bg-secondary-dark h-screen w-64 fixed left-0 top-0 p-4 flex flex-col">
      <div className="mb-8">
        <img
          src="/logo.svg"
          alt="DOI SAKET RECYCLE"
          className="w-20 h-20 mx-auto"
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
        <div className="bg-white p-4 rounded mb-4">
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
