import type React from "react";
import type { Material } from "../../types";

interface MaterialButtonProps {
  material: Material;
  onClick: (material: Material) => void;
}

export const MaterialButton: React.FC<MaterialButtonProps> = ({
  material,
  onClick,
}) => {
  return (
    <button
      className="material-btn border-solid border-2 bg-gray-50 border-gray-100"
      onClick={() => onClick(material)}
    >
      {material.name}
    </button>
  );
};
