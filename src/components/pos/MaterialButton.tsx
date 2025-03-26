import type React from "react";
import type { Material } from "../../types";

interface MaterialButtonProps {
  material: Material;
  onClick: (material: Material, image: string) => void; // Update onClick to accept an image
}

export const MaterialButton: React.FC<MaterialButtonProps> = ({
  material,
  onClick,
}) => {
  // Do not render button if material name is "ว่าง"
  if (material.name === "ว่าง") {
    return null;
  }

  // Mock image URL (replace with your actual mock image URL)
  const mockImage = "https://scontent.fbkk13-3.fna.fbcdn.net/v/t39.30808-6/486550554_1286642796357991_4113997253309244117_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=22yHNM0jG4IQ7kNvgHS9Evd&_nc_oc=AdmTXC1j6Nb77nlXbYqvon1u_k6xtec_rWaXes4x4HFRBXo9BoouHXZR7Csldxy9CqcDuTVd1xCeKzw793yx5sID&_nc_zt=23&_nc_ht=scontent.fbkk13-3.fna&_nc_gid=YSBWxbs291G3so5wVTddig&oh=00_AYEZQiMvVmHY_FX1oaFoXiE15bgrM0_iWGJ0WloYhiGQgA&oe=67E9B8BA"; 
// Example placeholder image

  return (
    <button
      className="material-btn border-solid border-2 bg-gray-50 border-gray-100"
      onClick={() => onClick(material, mockImage)} // Pass the mock image
    >
      {material.name}
    </button>
  );
};

// import type React from "react";
// import type { Material } from "../../types";

// interface MaterialButtonProps {
//   material: Material;
//   onClick: (material: Material) => void;
// }

// export const MaterialButton: React.FC<MaterialButtonProps> = ({
//   material,
//   onClick,
// }) => {
//   // Do not render button if material name is "ว่าง"
//   if (material.name === "ว่าง") {
//     return null;
//   }

//   return (
//     <button
//       className="material-btn border-solid border-2 bg-gray-50 border-gray-100"
//       onClick={() => onClick(material)}
//     >
//       {material.name}
//     </button>
//   );
// };

// import type React from "react";
// import type { Material } from "../../types";

// interface MaterialButtonProps {
//   material: Material;
//   onClick: (material: Material) => void;
// }

// export const MaterialButton: React.FC<MaterialButtonProps> = ({
//   material,
//   onClick,
// }) => {
//   return (
//     <button
//       className="material-btn border-solid border-2 bg-gray-50 border-gray-100"
//       onClick={() => onClick(material)}
//     >
//       {material.name}
//     </button>
//   );
// };
