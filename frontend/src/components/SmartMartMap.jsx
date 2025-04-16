import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const floors = ["Basement", "Ground", "1st floor", "2nd floor", "3rd floor"];

const floorComponents = {
  Basement: (
    <svg viewBox="0 0 800 400" className="w-full h-full border rounded-md">
      <motion.rect
        x="50"
        y="50"
        width="150"
        height="100"
        fill="#CBD5E0"
        stroke="#4A5568"
        data-tooltip-id="tooltip"
        data-tooltip-content="Zone A - Reserved Parking"
        whileHover={{ scale: 1.05, fill: "#A0AEC0" }}
      />
      <motion.rect
        x="250"
        y="50"
        width="150"
        height="100"
        fill="#E2E8F0"
        stroke="#4A5568"
        data-tooltip-id="tooltip"
        data-tooltip-content="Zone B - Staff Parking"
        whileHover={{ scale: 1.05, fill: "#CBD5E0" }}
      />
      <motion.rect
        x="450"
        y="50"
        width="150"
        height="100"
        fill="#EDF2F7"
        stroke="#4A5568"
        data-tooltip-id="tooltip"
        data-tooltip-content="Zone C - Visitor Parking"
        whileHover={{ scale: 1.05, fill: "#E2E8F0" }}
      />
      <motion.rect
        x="650"
        y="50"
        width="100"
        height="100"
        fill="#E53E3E"
        stroke="#2D3748"
        data-tooltip-id="tooltip"
        data-tooltip-content="Exit Ramp"
        whileHover={{ scale: 1.05, fill: "#F56565" }}
      />
    </svg>
  ),
  Ground: (
    <svg viewBox="0 0 800 400" className="w-full h-full border rounded-md">
      <motion.rect
        x="50"
        y="50"
        width="200"
        height="150"
        fill="#D1FAE5"
        stroke="#065F46"
        data-tooltip-id="tooltip"
        data-tooltip-content="Entry Area"
        whileHover={{ scale: 1.05, fill: "#A7F3D0" }}
      />
      <motion.rect
        x="300"
        y="50"
        width="200"
        height="150"
        fill="#FEF3C7"
        stroke="#92400E"
        data-tooltip-id="tooltip"
        data-tooltip-content="Info Desk"
        whileHover={{ scale: 1.05, fill: "#FDE68A" }}
      />
      <motion.rect
        x="550"
        y="50"
        width="200"
        height="250"
        fill="#C7D2FE"
        stroke="#3730A3"
        data-tooltip-id="tooltip"
        data-tooltip-content="Groceries Section"
        whileHover={{ scale: 1.05, fill: "#A5B4FC" }}
      />
      <motion.rect
        x="50"
        y="250"
        width="150"
        height="100"
        fill="#FBBF24"
        stroke="#B45309"
        data-tooltip-id="tooltip"
        data-tooltip-content="Aisle 1 - Fruits & Veggies"
        whileHover={{ scale: 1.05, fill: "#FCD34D" }}
      />
      <motion.rect
        x="220"
        y="250"
        width="150"
        height="100"
        fill="#FDBA74"
        stroke="#C2410C"
        data-tooltip-id="tooltip"
        data-tooltip-content="Aisle 2 - Beverages"
        whileHover={{ scale: 1.05, fill: "#FED7AA" }}
      />
      <motion.rect
        x="390"
        y="250"
        width="150"
        height="100"
        fill="#6EE7B7"
        stroke="#047857"
        data-tooltip-id="tooltip"
        data-tooltip-content="Aisle 3 - Snacks"
        whileHover={{ scale: 1.05, fill: "#A7F3D0" }}
      />
      <text
        x="50"
        y="160"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Entry Area
      </text>
      <text
        x="400"
        y="160"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Info Desk
      </text>
      <text
        x="700"
        y="160"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Groceries Section
      </text>
    </svg>
  ),
  "1st floor": (
    <svg viewBox="0 0 800 300" className="w-full h-full border rounded-md">
      <motion.rect
        x="100"
        y="50"
        width="600"
        height="150"
        fill="#FECACA"
        stroke="#B91C1C"
        data-tooltip-id="tooltip"
        data-tooltip-content="Clothes Section"
        whileHover={{ scale: 1.05, fill: "#F87171" }}
      />
      <motion.rect
        x="100"
        y="200"
        width="600"
        height="50"
        fill="#F3F4F6"
        stroke="#9CA3AF"
        data-tooltip-id="tooltip"
        data-tooltip-content="Checkout"
        whileHover={{ scale: 1.05, fill: "#D1D5DB" }}
      />
      <text
        x="400"
        y="130"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Clothes Section
      </text>
      <text
        x="400"
        y="230"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Checkout
      </text>
    </svg>
  ),
  "2nd floor": (
    <svg viewBox="0 0 800 300" className="w-full h-full border rounded-md">
      <motion.rect
        x="100"
        y="50"
        width="600"
        height="150"
        fill="#BFDBFE"
        stroke="#1E40AF"
        data-tooltip-id="tooltip"
        data-tooltip-content="Electronics Section"
        whileHover={{ scale: 1.05, fill: "#60A5FA" }}
      />
      <motion.rect
        x="100"
        y="200"
        width="600"
        height="50"
        fill="#F3F4F6"
        stroke="#9CA3AF"
        data-tooltip-id="tooltip"
        data-tooltip-content="Checkout"
        whileHover={{ scale: 1.05, fill: "#D1D5DB" }}
      />
      <text
        x="400"
        y="130"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Electronics Section
      </text>
      <text
        x="400"
        y="230"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Checkout
      </text>
    </svg>
  ),
  "3rd floor": (
    <svg viewBox="0 0 800 300" className="w-full h-full border rounded-md">
      <motion.rect
        x="100"
        y="50"
        width="600"
        height="150"
        fill="#DDD6FE"
        stroke="#6B21A8"
        data-tooltip-id="tooltip"
        data-tooltip-content="Watches Section"
        whileHover={{ scale: 1.05, fill: "#C4B5FD" }}
      />
      <motion.rect
        x="100"
        y="200"
        width="600"
        height="50"
        fill="#F3F4F6"
        stroke="#9CA3AF"
        data-tooltip-id="tooltip"
        data-tooltip-content="Checkout"
        whileHover={{ scale: 1.05, fill: "#D1D5DB" }}
      />
      <text
        x="400"
        y="130"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Watches Section
      </text>
      <text
        x="400"
        y="230"
        className="text-black font-bold"
        fontSize="16"
        textAnchor="middle"
      >
        Checkout
      </text>
    </svg>
  ),
};

const SmartMartMap = () => {
  const [activeFloor, setActiveFloor] = useState("Ground");

  return (
    <div className="p-4">
      <h2 className="text-6xl text-center font-bold mb-4">SmartMart Indoor Map</h2>

      <div className="flex gap-2 mb-4 mt-10">
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`px-3 py-1 border rounded-full transition ${
              activeFloor === floor ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {floor}
          </button>
        ))}
      </div>

      <motion.div
        key={activeFloor}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-[400px] mt-20"
      >
        {floorComponents[activeFloor]}
      </motion.div>

      <Tooltip id="tooltip" />
    </div>
  );
};

export default SmartMartMap;
