"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/sidebar";
import { MaterialButton } from "../components/pos/MaterialButton";
import { CartItem as CartItemComponent } from "../components/pos/CartItem";
import { TransactionSummary } from "../components/pos/TransactionSum";
import { useCart } from "../content/CartContent";
import type { Material } from "../types";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/materials";

export const POSPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("โลหะ");
  const [truckWeight, setTruckWeight] = useState(0);
  const [materialsByCategory, setMaterialsByCategory] = useState<
    Record<string, Material[]>
  >({
    โลหะ: [],
    เหล็ก: [],
    กระดาษ: [],
    แก้ว: [],
    แบตเตอรี่: [],
    พลาสติก: [],
    "ท่อพี.วี.ซี.": [],
    อื่นๆ: [],
  });
  const {
    items,
    addItem,
    removeItem,
    updateItemWeight,
    clearCart,
    totalAmount,
    totalWeight,
    member,
  } = useCart();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        const materials = response.data;

        // Organize materials by category
        const organizedMaterials: Record<string, Material[]> = {
          โลหะ: [],
          เหล็ก: [],
          กระดาษ: [],
          แก้ว: [],
          แบตเตอรี่: [],
          พลาสติก: [],
          "ท่อพี.วี.ซี.": [],
          อื่นๆ: [],
        };

        materials.forEach((material: Material) => {
          if (organizedMaterials[material.category]) {
            organizedMaterials[material.category].push(material);
          }
        });

        setMaterialsByCategory(organizedMaterials);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleMaterialClick = (material: Material) => {
    // Capture image from webcam
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL("image/png");
        // Add the material to the cart with the captured image
        addItem({ ...material, image: imageData }, 1);
      }
    }
  };

  const handleCheckout = () => {
    alert(`Transaction completed!\nTotal: ${totalAmount.toFixed(2)} บาท`);
    clearCart();
    navigate("/membership");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this transaction?")) {
      clearCart();
      navigate("/membership");
    }
  };

  return (
    <div className="h-screen bg-[#dae8d6]">
      <Sidebar
        activeMaterial={activeCategory}
        onMaterialChange={setActiveCategory}
      />

      <div className="ml-64 pr-96 h-screen">
        <div className="bg-[#dae8d6] p-4 sticky top-0">
          <div className="bg-white p-4 top-0 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-center text-[#2d6e7e]">
              รับซื้อสินค้า
            </h1>
          </div>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <div className="grid grid-cols-3 gap-4">
            {materialsByCategory[activeCategory].map((material) => (
              <MaterialButton
                key={material.id} // Use _id from MongoDB
                material={material}
                onClick={handleMaterialClick}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-96 bg-[#f0f5ee] p-4 fixed right-0 top-0 bottom-0 flex flex-col h-screen">
        {member ? (
          <div className="bg-blue-100 px-4 py-2 rounded mb-2">
            <span className="font-medium">
              สมาชิก: {member.code} {member.name} {/* Display memberID and memberNameTH */}
            </span>
          </div>
        ) : (
          <div className="bg-blue-100 px-4 py-2 rounded mb-2">
            <span className="font-medium">สมาชิก: 0001 ลูกค้าทั่วไป</span>
          </div>
        )}
        <h1 className="text-xl font-bold text-center text-black mb-2">
          รายการสินค้า
        </h1>
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">ยังไม่มีรายการสินค้า</p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item, index) => (
                <CartItemComponent
                  key={index}
                  item={item}
                  index={index}
                  onRemove={removeItem}
                  onUpdateWeight={updateItemWeight}
                  videoRef={videoRef} // Pass videoRef to CartItem
                  canvasRef={canvasRef} // Pass canvasRef to CartItem
                />
              ))}
            </div>
          )}
        </div>

        <TransactionSummary
          totalWeight={totalWeight}
          totalAmount={totalAmount}
          truckWeight={truckWeight}
          onTruckWeightChange={setTruckWeight}
          onCheckout={handleCheckout}
          onCancel={handleCancel}
        />
      </div>

      {/* Video and Canvas Elements */}
      <video ref={videoRef} style={{ display: "none" }} autoPlay />
      <canvas ref={canvasRef} style={{ display: "none" }} width={320} height={240} />
    </div>
  );
};
// "use client";

// import type React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "../components/layout/sidebar";
// import { MaterialButton } from "../components/pos/MaterialButton";
// import { CartItem as CartItemComponent } from "../components/pos/CartItem";
// import { TransactionSummary } from "../components/pos/TransactionSum";
// import { useCart } from "../content/CartContent";
// import type { Material } from "../types";

// const API_BASE_URL = "http://localhost:3000/materials";

// //Sample materials data
// const materialsByCategory: Record<string, Material[]> = {
//   โลหะ: [
//     {
//       id: "0101",
//       name: "ทองแดง#1",
//       price: 297.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0102",
//       name: "ทองแดง#2",
//       price: 286.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0103",
//       name: "ทองแดง#3",
//       price: 276.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0104",
//       name: "ทองแดง#4",
//       price: 271.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0105",
//       name: "ทองแดงชุป",
//       price: 235.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0107",
//       name: "ทล.หนา(สะอาด)",
//       price: 178.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0108",
//       name: "ทล.บาง(สะอาด)",
//       price: 158.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0109",
//       name: "ทล.หม้อน้ำ",
//       price: 158.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0110",
//       name: "เนียมสาย",
//       price: 70.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0111",
//       name: "เนียมฉาก",
//       price: 60.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0112",
//       name: "เนียมบาง",
//       price: 51.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0113",
//       name: "เนียมแข็ง(สะอาด)",
//       price: 51.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0114",
//       name: "เนียมหล่อเครื่อง",
//       price: 55.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0115",
//       name: "เนียมป๋อง",
//       price: 56.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0116",
//       name: "เนียมล้อแม๊ก",
//       price: 66.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0117",
//       name: "เนียมมุ้งลวด",
//       price: 22.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0118",
//       name: "เนียมมู่ลี่",
//       price: 22.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0119",
//       name: "เนียมกะทะ",
//       price: 33.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0120",
//       name: "เนียมตูด",
//       price: 32.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0121",
//       name: "เนียมอัลลอยด์",
//       price: 35.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0122",
//       name: "เนียมเบรค(ไม่แกะ)",
//       price: 30.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0123",
//       name: "เนียมหม้อน้ำ",
//       price: 39.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0124",
//       name: "เนียมแอร์ไส้ทด.(ถี่)",
//       price: 145.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0125",
//       name: "เนียมแอร์ไส้ทด.(ห่าง)",
//       price: 140.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0126",
//       name: "เนียมฝาแกะ",
//       price: 34.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0127",
//       name: "เนียมฝาน้ำแกะ",
//       price: 4.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0128",
//       name: "เลสสวย",
//       price: 27.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0129",
//       name: "เลสติดตะกั่ว",
//       price: 22.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0130",
//       name: "เลสเกรดต่ำ",
//       price: 6.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0131",
//       name: "ตะกั่วแข็ง",
//       price: 46.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0132",
//       name: "ตะกั่วอ่อน",
//       price: 45.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0133",
//       name: "ตะกั่วอ่อน(สังกะสี)",
//       price: 18.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0134",
//       name: "เนียมฉากทีบาร์",
//       price: 52.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0135",
//       name: "เนียมฉากปั๊มแข็ง",
//       price: 33.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0136",
//       name: "เนียมฉากติดสี",
//       price: 47.0,
//       category: "โลหะ",
//     },
//     {
//       id: "0137",
//       name: "เนียมเพลท",
//       price: 57.0,
//       category: "โลหะ",
//     },
//   ],
//   เหล็ก: [
//     {
//       id: "0201",
//       name: "เหล็กหนา(สั้น)",
//       price: 9.8,
//       category: "เหล็ก",
//     },
//     {
//       id: "0202",
//       name: "เหล็กหนา(ยาว)",
//       price: 9.4,
//       category: "เหล็ก",
//     },
//     {
//       id: "0203",
//       name: "เหล็กรวม",
//       price: 9.4,
//       category: "เหล็ก",
//     },
//     {
//       id: "0204",
//       name: "เหล็กบาง",
//       price: 8.4,
//       category: "เหล็ก",
//     },
//     {
//       id: "0205",
//       name: "เหล็กตะปู/รังนก",
//       price: 7.4,
//       category: "เหล็ก",
//     },
//     {
//       id: "0206",
//       name: "เหล็กข้ออ้อยนิ้ว",
//       price: 9.4,
//       category: "เหล็ก",
//     },
//     {
//       id: "0207",
//       name: "เหล็กข้ออ้อย 6 หุน",
//       price: 9.4,
//       category: "เหล็ก",
//     },
//     {
//       id: "0208",
//       name: "เหล็กหล่อเล็ก",
//       price: 10.0,
//       category: "เหล็ก",
//     },
//     {
//       id: "0209",
//       name: "เหล็กหล่อใหญ่",
//       price: 4.8,
//       category: "เหล็ก",
//     },
//     {
//       id: "0210",
//       name: "เหล็กกระป๋อง",
//       price: 5.5,
//       category: "เหล็ก",
//     },
//     {
//       id: "0211",
//       name: "สังกะสี",
//       price: 5.0,
//       category: "เหล็ก",
//     },
//     {
//       id: "0212",
//       name: "ถังน้ำมัน 200 ลิตร",
//       price: 3.0,
//       category: "เหล็ก",
//     },
//   ],
//   กระดาษ: [
//     {
//       id: "0301",
//       name: "ดาษลังน้ำตาล",
//       price: 4.2,
//       category: "กระดาษ",
//     },
//     {
//       id: "0302",
//       name: "ดาษเศษ",
//       price: 3.4,
//       category: "กระดาษ",
//     },
//     {
//       id: "0303",
//       name: "ขาว-ดำ",
//       price: 6.6000000000000005,
//       category: "กระดาษ",
//     },
//     {
//       id: "0304",
//       name: "น.ส.พ.",
//       price: 10.0,
//       category: "กระดาษ",
//     },
//     {
//       id: "0306",
//       name: "ขาวดำ(ติดสันกาว)",
//       price: 3.6,
//       category: "กระดาษ",
//     },
//     {
//       id: "0307",
//       name: "ถุงปูน/แกนกระดาษ",
//       price: 2.0,
//       category: "กระดาษ",
//     },
//   ],
//   แก้ว: [
//     {
//       id: "0401",
//       name: "เศษแก้วแดง",
//       price: 1.07,
//       category: "แก้ว",
//     },
//     {
//       id: "0402",
//       name: "เศษแก้วขาว",
//       price: 1.72,
//       category: "แก้ว",
//     },
//     {
//       id: "0403",
//       name: "เศษแก้วเขียว",
//       price: 1.17,
//       category: "แก้ว",
//     },
//     {
//       id: "0404",
//       name: "เศษแก้วรวม",
//       price: 0.5,
//       category: "แก้ว",
//     },
//     {
//       id: "0405",
//       name: "ช้าง",
//       price: 15.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0406",
//       name: "ช้างเขียวเล็ก",
//       price: 18.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0407",
//       name: "เหล้าขาว",
//       price: 15.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0408",
//       name: "เหล้าขาวเล็ก",
//       price: 20.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0409",
//       name: "หงส์",
//       price: 19.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0410",
//       name: "หงษ์แบน(ใหม่)",
//       price: 16.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0411",
//       name: "แสงกลม",
//       price: 16.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0412",
//       name: "แสงแบน",
//       price: 12.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0413",
//       name: "คอยาว",
//       price: 15.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0414",
//       name: "ลีโอ",
//       price: 10.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0415",
//       name: "ลีโอเล็ก",
//       price: 17.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0416",
//       name: "ไฮเนเก้นใหญ่",
//       price: 21.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0417",
//       name: "ไฮเนเก้นเล็ก",
//       price: 21.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0418",
//       name: "อัดลมเล็กพร้อมลัง",
//       price: 0.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0419",
//       name: "โซดาสิงห์พร้อมลัง",
//       price: 30.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0420",
//       name: "น้ำหวาน",
//       price: 14.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0421",
//       name: "เหล้าขาว (เก่า)",
//       price: 17.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0422",
//       name: "เหล้าขาวเล็ก (เก่า)",
//       price: 13.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0423",
//       name: "สิงห์ใหญ่",
//       price: 9.5,
//       category: "แก้ว",
//     },
//     {
//       id: "0424",
//       name: "หงส์แบน (เก่า)",
//       price: 0.0,
//       category: "แก้ว",
//     },
//     {
//       id: "0425",
//       name: "คาราบาว",
//       price: 10.0,
//       category: "แก้ว",
//     },
//   ],
//   แบตเตอรี่: [
//     {
//       id: "0501",
//       name: "แบตขาว",
//       price: 31.5,
//       category: "แบตเตอรี่",
//     },
//     {
//       id: "0502",
//       name: "แบตแห้ง",
//       price: 25.0,
//       category: "แบตเตอรี่",
//     },
//     {
//       id: "0503",
//       name: "แบตดำ",
//       price: 19.0,
//       category: "แบตเตอรี่",
//     },
//     {
//       id: "0504",
//       name: "แบตเล็ก",
//       price: 30.5,
//       category: "แบตเตอรี่",
//     },
//   ],
//   พลาสติก: [
//     {
//       id: "0601",
//       name: "ติกสีรวม",
//       price: 3.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0602",
//       name: "ติกดำ",
//       price: 1.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0603",
//       name: "ติกเพทขาว",
//       price: 13.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0604",
//       name: "ติกเพทเขียว",
//       price: 0.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0605",
//       name: "แผ่นซี.ดี.",
//       price: 15.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0606",
//       name: "ติกกรอบ",
//       price: 3.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0607",
//       name: "ติกใส 1",
//       price: 10.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0608",
//       name: "ติกใส 2",
//       price: 10.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0609",
//       name: "ติกใส 3",
//       price: 10.0,
//       category: "พลาสติก",
//     },
//     {
//       id: "0610",
//       name: "ลังน้ำ 20 ช่อง",
//       price: 30.0,
//       category: "พลาสติก",
//     },
//   ],
//   "ท่อพี.วี.ซี.": [
//     {
//       id: "0701",
//       name: "พี.วี.ซี.รวม",
//       price: 2.0,
//       category: "ท่อพี.วี.ซี.",
//     },
//     {
//       id: "0702",
//       name: "ท่องอสีฟ้า",
//       price: 1.0,
//       category: "ท่อพี.วี.ซี.",
//     },
//     {
//       id: "0703",
//       name: "พี.วี.ซี.เทา",
//       price: 1.0,
//       category: "ท่อพี.วี.ซี.",
//     },
//     {
//       id: "0704",
//       name: "PVCฟ้าตรง",
//       price: 3.0,
//       category: "ท่อพี.วี.ซี.",
//     },
//     {
//       id: "0705",
//       name: "PVCเหลืองตรง",
//       price: 2.0,
//       category: "ท่อพี.วี.ซี.",
//     },
//   ],
//   อื่นๆ: [
//     {
//       id: "0801",
//       name: "เปลือกสายไฟ",
//       price: 1.0,
//       category: "อื่นๆ",
//     },
//     {
//       id: "0802",
//       name: "สายยางขาว",
//       price: 1.0,
//       category: "อื่นๆ",
//     },
//     {
//       id: "0803",
//       name: "รองเท้าบู๊ท",
//       price: 5.0,
//       category: "อื่นๆ",
//     },
//     {
//       id: "0804",
//       name: "สายยางเขียว",
//       price: 1.0,
//       category: "อื่นๆ",
//     },
//     {
//       id: "0805",
//       name: "รองเท้าแดง",
//       price: 2.0,
//       category: "อื่นๆ",
//     },
//     {
//       id: "0806",
//       name: "เสื่อน้ำมัน",
//       price: 0.0,
//       category: "อื่นๆ",
//     },
//     {
//       id: "0807",
//       name: "สายรัด",
//       price: 1.0,
//       category: "อื่นๆ",
//     },
//     {
//       id: "0808",
//       name: "ถุงปุ๋ย",
//       price: 1.0,
//       category: "อื่นๆ",
//     },
//   ],
// };

// export const POSPage: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState("โลหะ");
//   const [truckWeight, setTruckWeight] = useState(0);
//   const {
//     items,
//     addItem,
//     removeItem,
//     updateItemWeight,
//     clearCart,
//     totalAmount,
//     totalWeight,
//     member,
//   } = useCart();
//   const navigate = useNavigate();

//   const handleMaterialClick = (material: Material) => {
//     // Default weight is 1kg, can be updated later
//     addItem(material, 1);
//   };

//   const handleCheckout = () => {
//     // Save the transaction to a database
//     alert(`Transaction completed!\nTotal: ${totalAmount.toFixed(2)} บาท`);
//     clearCart();
//     navigate("/membership");
//   };

//   const handleCancel = () => {
//     if (window.confirm("Are you sure you want to cancel this transaction?")) {
//       clearCart();
//       navigate("/membership");
//     }
//   };

//   return (
//     <div className="h-screen bg-[#dae8d6]">
//       <Sidebar
//         activeMaterial={activeCategory}
//         onMaterialChange={setActiveCategory}
//       />

//       <div className="ml-64 pr-96 h-screen">
//         <div className="bg-[#dae8d6] p-4 sticky top-0">
//           <div className="bg-white p-4 top-0 rounded-lg shadow-sm">
//             <h1 className="text-3xl font-bold text-center text-[#2d6e7e]">
//               รับซื้อสินค้า
//             </h1>
//           </div>
//         </div>
//         <div className="p-4 overflow-y-auto h-full">
//           {/* Material grid - positioned between sidebar and cart */}
//           <div className="grid grid-cols-3 gap-4">
//             {materialsByCategory[activeCategory].map((material) => (
//               <MaterialButton
//                 key={material.id}
//                 material={material}
//                 onClick={handleMaterialClick}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Cart panel - fixed on the right side */}
//       <div className="w-96 bg-[#f0f5ee] p-4 fixed right-0 top-0 bottom-0 flex flex-col h-screen">
//         {member && (
//           <div className="bg-blue-100 px-4 py-2 rounded mb-2">
//             <span className="font-medium">
//               สมาชิก : {member.code} {member.name}
//             </span>
//           </div>
//         )}
//         <h1 className="text-xl font-bold text-center text-black mb-2">
//           รายการสินค้า
//         </h1>
//         <div className="flex-1 overflow-y-auto">
//           {items.length === 0 ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">ยังไม่มีรายการสินค้า</p>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {items.map((item, index) => (
//                 <CartItemComponent
//                   key={index}
//                   item={item}
//                   index={index}
//                   onRemove={removeItem}
//                   onUpdateWeight={updateItemWeight}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         <TransactionSummary
//           totalWeight={totalWeight}
//           totalAmount={totalAmount}
//           truckWeight={truckWeight}
//           onTruckWeightChange={setTruckWeight}
//           onCheckout={handleCheckout}
//           onCancel={handleCancel}
//         />
//       </div>
//     </div>
//   );
// };
