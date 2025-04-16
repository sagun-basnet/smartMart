import React, { useState } from "react";
import StoreMapSVG from "./StoreMapSVG";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const IndoorMapPage = () => {
  const [highlightedSection, setHighlightedSection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const stockData = {
    Clothes: 120,
    Watches: 85,
    Electronics: 45,
    Groceries: 210,
  };

  const handleSectionClick = (section) => {
    toast(`Navigating to ${section} section`);
    navigate(`/shop/${section}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const match = Object.keys(stockData).find((cat) =>
      cat.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setHighlightedSection(match || "");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        SmartMart Store Map
      </h1>

      {/* Product Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search category..."
          className="border p-2 rounded-md w-80 shadow-sm"
        />
      </div>

      <StoreMapSVG
        onSectionClick={handleSectionClick}
        highlightedSection={highlightedSection}
        stockData={stockData}
      />
    </div>
  );
};

export default IndoorMapPage;
