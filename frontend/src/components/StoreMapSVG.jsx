import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const StoreMapSVG = ({ onSectionClick, highlightedSection, stockData }) => {
  const categories = [
    { name: "Clothes", x: 100, y: 80, color: "#c084fc", id: "clothes" },
    { name: "Watches", x: 320, y: 80, color: "#60a5fa", id: "watches" },
    {
      name: "Electronics",
      x: 100,
      y: 320,
      color: "#facc15",
      id: "electronics",
    },
    { name: "Groceries", x: 320, y: 320, color: "#34d399", id: "groceries" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 relative">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-auto border rounded-lg shadow-md bg-white"
      >
        <rect x="0" y="0" width="1000" height="600" fill="#f8fafc" />
        <rect x="20" y="250" width="50" height="100" fill="#4ade80" rx="8" />
        <text x="25" y="305" fontSize="14" fill="#000">
          Entry
        </text>

        <rect x="920" y="220" width="60" height="160" fill="#f87171" rx="10" />
        <text
          x="930"
          y="305"
          fontSize="12"
          fill="#fff"
          transform="rotate(90 930,305)"
        >
          Checkout
        </text>

        {/* Aisle numbers */}
        <text x="250" y="70" fontSize="12" fill="#64748b">
          Aisle 1
        </text>
        <text x="470" y="70" fontSize="12" fill="#64748b">
          Aisle 2
        </text>
        <text x="250" y="580" fontSize="12" fill="#64748b">
          Aisle 3
        </text>
        <text x="470" y="580" fontSize="12" fill="#64748b">
          Aisle 4
        </text>

        {/* Category Sections */}
        {categories.map((cat) => (
          <g
            key={cat.name}
            className="cursor-pointer"
            onClick={() => onSectionClick(cat.name)}
            data-tooltip-id={`tooltip-${cat.id}`}
            data-tooltip-content={`${cat.name} (${
              stockData[cat.name]
            } items in stock)`}
          >
            <rect
              x={cat.x}
              y={cat.y}
              width="200"
              height="200"
              rx="10"
              fill={cat.name === highlightedSection ? "#f97316" : cat.color}
              stroke="#1e293b"
              strokeWidth="1.5"
            />
            <text x={cat.x + 70} y={cat.y + 110} fontSize="16" fill="#fff">
              {cat.name}
            </text>
            <Tooltip id={`tooltip-${cat.id}`} />
          </g>
        ))}

        <text x="400" y="40" fontSize="24" fontWeight="bold" fill="#0f172a">
          SmartMart Store Map
        </text>
      </svg>
    </div>
  );
};

export default StoreMapSVG;
