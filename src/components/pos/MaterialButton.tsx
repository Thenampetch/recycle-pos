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
      className="material-btn border-solid border-2 border-gray-300"
      onClick={() => onClick(material)}
    >
      {material.name}
    </button>
  );
};
