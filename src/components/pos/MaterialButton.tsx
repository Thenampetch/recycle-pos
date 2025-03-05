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
    <button className="material-btn" onClick={() => onClick(material)}>
      {material.name}
    </button>
  );
};
